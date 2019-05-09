using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Microsoft.AspNetCore.SignalR;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.Common;
using Retros.Application.UseCases.GetRetro;
using Retros.Application.UseCases.GetRetroByReference;
using Retros.Application.UseCases.GetRetros;
using Retros.Application.UseCases.UpdateComment;

namespace Retros.Web.Hubs
{
    public class RetroHub : Hub
    {
        readonly IRequestPipelineMediator requestPipelineMediator;
        private readonly IRetroReposirotory retroReposirotory;
        private readonly IUserContextProvider userContextProvider;

        public RetroHub(
            IRequestPipelineMediator requestPipelineMediator, 
            IRetroReposirotory retroReposirotory, 
            IUserContextProvider userContextProvider
        )
        {
            this.requestPipelineMediator = requestPipelineMediator;
            this.retroReposirotory = retroReposirotory;
            this.userContextProvider = userContextProvider;
        }

        public async Task JoinRetro(string reference)
        {
            var retro = await this.requestPipelineMediator.Handle<GetRetroByReferenceRequest, OperationResult<RetroDTO>>(new GetRetroByReferenceRequest{Reference = reference});
            await this.Clients.Caller.SendAsync("ReceiveRetro", retro.Value);
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, retro.Value.Id.ToString());
        }

        public async Task AddComment(AddCommentRequest request)
        {
            var response = await this.requestPipelineMediator.Handle<AddCommentRequest, OperationResult<CommentDTO>>(request);
            var payload = new { comment = response.Value, groupId = request.GroupId };

            await this.Clients.Caller.SendAsync("CommentAdded", payload);

            var retro = await this.requestPipelineMediator.Handle<GetRetroRequest, OperationResult<RetroDTO>>(new GetRetroRequest {RetroId = request.RetroId});
            
            if(retro.Value.Groups.FirstOrDefault(g => g.Id == request.GroupId).CommentsArePublic){
                payload.comment.IsOwner = false;
                await this.Clients
                    .OthersInGroup(request.RetroId.ToString())
                    .SendAsync("CommentAdded", payload);
            }
        }

        public async Task UpdateComment(UpdateCommentRequest request)
        {
            var response = await this.requestPipelineMediator.Handle<UpdateCommentRequest, OperationResult<UpdateCommentResponse>>(request);

            if(response.Succeded)
            {
                await this.Clients.Caller.SendAsync("CommentUpdated", response.Value);

                response.Value.Comment.IsOwner = false;
                await this.Clients.OthersInGroup(request.RetroId.ToString())
                          .SendAsync("CommentUpdated", response.Value);
            }
        }

        public async Task ToggleRetroGroupVisibility(RetroGroupActionRequest request) 
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);
            var userId = this.userContextProvider.GetUserId();

            if(userId == retro.OwnerId) {
                var group = retro.Groups.SingleOrDefault(g => g.Id == request.GroupId);
                group.ToggleVisibility();
                await this.retroReposirotory.Update(retro);
                await this.Clients.Clients(request.RetroId.ToString())
                    .SendAsync("GroupVisibilityChanged", group);
            }
        }

        public async Task GetRetros()
        {
            var getRetros = await this.requestPipelineMediator.Handle<GetRetrosRequest, OperationResult<IEnumerable<RetroDTO>>>(new GetRetrosRequest { });
            await this.Clients.Caller.SendAsync("ReceiveRetros", getRetros.Value);
        }
    }
}