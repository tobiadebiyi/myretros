using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.UpdateComment
{
    public class UpdateCommentInteractor : IInteractor<UpdateCommentRequest, OperationResult<UpdateCommentResponse>>
    {
        readonly IRetroReposirotory retroReposirotory;
        readonly IUserContextProvider userContextProvider;

        public UpdateCommentInteractor(
            IRetroReposirotory retroReposirotory,
            IUserContextProvider userContextProvider
        )
        {
            this.retroReposirotory = retroReposirotory;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<UpdateCommentResponse>> Handle(UpdateCommentRequest request)
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);
            if (retro == null) return OperationResultCreator.Failed<UpdateCommentResponse>($"Could not find a retro with the id: '{request.RetroId}'");

            var comment = retro.Groups
                               .SingleOrDefault(g => g.Id == request.GroupId)?
                               .Comments.SingleOrDefault(c => c.Id == request.Comment.Id);

            if (comment == null)
                return OperationResultCreator.Failed<UpdateCommentResponse>("Comment not found");

            comment.Text = request.Comment.Text;

            removedActions(request, comment);
            addActions(request, comment);

            await this.retroReposirotory.Update(retro);

            var response = new UpdateCommentResponse
            {
                Comment = new CommentDTO(comment, this.userContextProvider.GetUserId()),
                GroupId = request.GroupId,
                RetroId = request.RetroId
            };

            return OperationResultCreator.Suceeded(response);
        }

        private static void addActions(UpdateCommentRequest request, Domain.Comment comment)
        {
            var newActions = request.Comment.Actions.Where(a => a.Id == Guid.Empty);

            foreach (var action in newActions)
            {
                comment.Actions.Add(new Domain.Action(action.Text));
            }
        }

        private static void removedActions(UpdateCommentRequest request, Domain.Comment comment)
        {
            var removedActions = comment.Actions
                            .Where(a => !request.Comment.Actions.Select(ac => ac.Id).Contains(a.Id));

            foreach (var action in removedActions)
            {
                comment.Actions.Remove(action);
            }
        }
    }
}
