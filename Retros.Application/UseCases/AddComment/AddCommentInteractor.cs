using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Domain;

namespace Retros.Application.UseCases.AddComment
{
    public class AddCommentInteractor : IInteractor<AddCommentRequest, OperationResult<CommentDTO>>
    {
        readonly IRetroReposirotory retroReposirotory;
        readonly IUserContextProvider userContextProvider;

        public AddCommentInteractor(
            IRetroReposirotory retroReposirotory,
            IUserContextProvider userContextProvider
        )
        {
            this.retroReposirotory = retroReposirotory;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<CommentDTO>> Handle(AddCommentRequest request)
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);

            var activeUserId = this.userContextProvider.GetUserId();
            var comment = new Comment(request.Comment.Text, activeUserId);
            retro.AddComment(request.GroupId, comment);

            await this.retroReposirotory.Update(retro);
            return OperationResultCreator.Suceeded(new CommentDTO(comment, activeUserId));
        }
    }
}
