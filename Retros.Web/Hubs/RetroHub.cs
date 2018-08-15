using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Infrastructure;
using Microsoft.AspNetCore.SignalR;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.GetRetro;
using Retros.Application.UseCases.GetRetros;
using Retros.Application.UseCases.UpdateComment;

namespace Retros.Web.Hubs
{
    public class RetroHub : Hub
    {
        readonly IRequestPipelineMediator requestPipelineMediator;

        public RetroHub(IRequestPipelineMediator requestPipelineMediator)
        {
            this.requestPipelineMediator = requestPipelineMediator;
        }

        public async Task JoinRetro(Guid retroId)
        {
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, retroId.ToString());
            var retros = await this.requestPipelineMediator.Handle<GetRetroRequest, OperationResult<RetroDTO>>(new GetRetroRequest{RetroId = retroId});
            await this.Clients.Caller.SendAsync("ReceiveRetro", retros.Value);
        }

        public async Task AddComment(AddCommentRequest request)
        {
            var response = await this.requestPipelineMediator.Handle<AddCommentRequest, OperationResult<CommentDTO>>(request);
            var payload = new { comment = response.Value, groupId = request.GroupId };

            await this.Clients.Caller.SendAsync("CommentAdded", payload);

            payload.comment.IsOwner = false;
            await this.Clients.OthersInGroup(request.RetroId.ToString())
                      .SendAsync("CommentAdded", payload);
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

        public async Task GetRetros()
        {
            var getRetros = await this.requestPipelineMediator.Handle<GetRetrosRequest, OperationResult<IEnumerable<RetroDTO>>>(new GetRetrosRequest { });
            await this.Clients.Caller.SendAsync("ReceiveRetros", getRetros.Value);
        }
    }
}