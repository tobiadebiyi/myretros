using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Infrastructure;
using Microsoft.AspNetCore.SignalR;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.GetRetroByReference;
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