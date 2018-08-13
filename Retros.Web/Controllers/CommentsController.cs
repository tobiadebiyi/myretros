using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.UpdateComment;

namespace Retros.Web.Controllers
{
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        public CommentsController(
            IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addCommentInteractor,
            IInteractor<UpdateCommentRequest, OperationResult<CommentDTO>> updateCommentInteractor
        
        )
        {
            this.AddCommentInteractor = addCommentInteractor;
            this.UpdateCommentInteractor = updateCommentInteractor;
        }

        readonly IInteractor<AddCommentRequest, OperationResult<CommentDTO>> AddCommentInteractor;
        private readonly IInteractor<UpdateCommentRequest, OperationResult<CommentDTO>> UpdateCommentInteractor;

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentRequest request)
        {
            return this.Ok(await this.AddCommentInteractor.Handle(request));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateCommentRequest request)
        {
            return this.Ok(await this.UpdateCommentInteractor.Handle(request));
        }
    }
}
