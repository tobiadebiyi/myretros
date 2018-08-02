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

namespace Retros.Web.Hubs
{
    public class RetroHub : Hub
    {
        readonly IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment;
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor;
        readonly IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor;

        public RetroHub(
            IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addComment,
            IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor,
            IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor
        )
        {
            this.addComment = addComment;
            this.getRetrosInteractor = getRetrosInteractor;
            this.getRetroInteractor = getRetroInteractor;
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
            await this.Clients.Group(request.RetroId.ToString())
                      .SendAsync("CommentAdded", new { comment = response.Value, groupId = request.GroupId});
        }

        public async Task GetRetros()
        {
            var getRetros = await getRetrosInteractor.Handle(new GetRetrosRequest { });
            await this.Clients.Caller.SendAsync("ReceiveRetros", getRetros.Value.Retros);
        }
    }
}