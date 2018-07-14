using System;
using System.Threading.Tasks;
using Projects.Repositories;
using Retros.Domain;
using Retros.Web.Application;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.UseCases.UpdateComment
{
    public class UpdateCommentInteractor : IInteractor<UpdateCommentRequest, OperationResult<CommentDTO>>
    {
        readonly IRetroReposirotory retroReposirotory;

        public UpdateCommentInteractor(IRetroReposirotory retroReposirotory)
        {
            this.retroReposirotory = retroReposirotory;
        }

        public async Task<OperationResult<CommentDTO>> Handle(UpdateCommentRequest request)
        {
            throw new NotImplementedException();
            //var retro = await this.retroReposirotory.Get(request.RetroId);
            //var comment = new Comment(request.Comment.Text);
            //retro.AddComment(request.GroupId, request.Comment.AsDomainModel());

            //await this.retroReposirotory.Update(retro);
            //return OperationResultCreator.Suceeded(new CommentDTO(comment));
        }
    }
}
