using System.Threading.Tasks;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Domain;

namespace Retros.Application.UseCases.AddComment
{
    public class AddCommentInteractor : IInteractor<AddCommentRequest, OperationResult<CommentDTO>>
    {
        readonly IRetroReposirotory retroReposirotory;

        public AddCommentInteractor(IRetroReposirotory retroReposirotory)
        {
            this.retroReposirotory = retroReposirotory;
        }

        public async Task<OperationResult<CommentDTO>> Handle(AddCommentRequest request)
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);
            var comment = new Comment(request.Comment.Text);
            retro.AddComment(request.GroupId, request.Comment.AsDomainModel());

            await this.retroReposirotory.Update(retro);
            return OperationResultCreator.Suceeded(new CommentDTO(comment));
        }
    }
}
