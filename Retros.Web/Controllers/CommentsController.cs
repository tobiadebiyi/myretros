using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Retros.Web.Application;
using Retros.Web.UseCases.AddComment;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.Controllers
{
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        public CommentsController(IInteractor<AddCommentRequest, OperationResult<CommentDTO>> addCommentInteractor)
        {
            AddCommentInteractor = addCommentInteractor;
        }

        readonly IInteractor<AddCommentRequest, OperationResult<CommentDTO>> AddCommentInteractor;

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentRequest request)
        {
            return this.Ok(await this.AddCommentInteractor.Handle(request));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateComment([FromBody] AddCommentRequest request)
        {
            return this.Ok(await this.AddCommentInteractor.Handle(request));
        }
    }
}
