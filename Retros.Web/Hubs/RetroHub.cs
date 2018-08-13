using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.GetRetro;
using Retros.Application.UseCases.GetRetros;
using Retros.Application.UseCases.UpdateComment;

namespace Retros.Web.Hubs
{
    public class RetroHub : Hub
    {
        readonly IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment;
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor;
        readonly IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor;
        private readonly IInteractor<UpdateCommentRequest, OperationResult<UpdateCommentResponse>> updateCommentInteractor;

        public RetroHub(
            IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment,
            IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor,
            IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor,
            IInteractor<UpdateCommentRequest, OperationResult<UpdateCommentResponse>> updateCommentInteractor
        )
        {
            this.addComment = addComment;
            this.getRetrosInteractor = getRetrosInteractor;
            this.getRetroInteractor = getRetroInteractor;
            this.updateCommentInteractor = updateCommentInteractor;
        }

        public async Task JoinRetro(Guid retroId)
        {
            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, retroId.ToString());
            var retros = await this.getRetroInteractor.Handle(new GetRetroRequest{RetroId = retroId});
            await this.Clients.Caller.SendAsync("ReceiveRetro", retros.Value);
        }

        public async Task AddComment(AddCommentRequest request)
        {
            var response = await addComment.Handle(request);
            var payload = new { comment = response.Value, groupId = request.GroupId };

            await this.Clients.Caller.SendAsync("CommentAdded", payload);

            payload.comment.IsOwner = false;
            await this.Clients.OthersInGroup(request.RetroId.ToString())
                      .SendAsync("CommentAdded", payload);
        }

        public async Task UpdateComment(UpdateCommentRequest request)
        {
            var response = await updateCommentInteractor.Handle(request);

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
            var getRetros = await getRetrosInteractor.Handle(new GetRetrosRequest { });
            await this.Clients.Caller.SendAsync("ReceiveRetros", getRetros.Value.Retros);
        }
    }
}