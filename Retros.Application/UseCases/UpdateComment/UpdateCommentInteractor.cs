using System.Linq;
using System.Threading.Tasks;
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
            if (retro == null) return OperationResultCreator.Failed<UpdateCommentResponse>("Retro not found");

            var comment = retro.Groups
                               .SingleOrDefault(g => g.Id == request.GroupId)?
                               .Comments.SingleOrDefault(c => c.Id == request.Comment.Id);

            if (comment == null) 
                return OperationResultCreator.Failed<UpdateCommentResponse>("Comment not found");

            comment.Text = request.Comment.Text;

            await this.retroReposirotory.Update(retro);

            var response = new UpdateCommentResponse
            {
                Comment = new CommentDTO(comment, this.userContextProvider.GetUserId()),
                GroupId = request.GroupId,
                RetroId = request.RetroId
            };

            return OperationResultCreator.Suceeded(response);
        }
    }
}
