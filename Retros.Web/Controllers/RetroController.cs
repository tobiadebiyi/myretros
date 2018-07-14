using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Projects.UseCases.GetRetros;
using Retros.Domain;
using Retros.Web.Application;
using Retros.Web.UseCases.AddComment;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.Controllers
{
    [Route("api/[controller]")]
    public class RetrosController : Controller
    {
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor;

        public RetrosController(IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor)
        {
            this.getRetroInteractor = getRetroInteractor;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetRetros()
        {
            return Ok(await getRetroInteractor.Handle(new GetRetrosRequest()));
        }

        [HttpGet]
        [Route("{retroId}")]
        public async Task<IActionResult> GetRetro(Guid retroId)
        {
            var retros = await getRetroInteractor.Handle(new GetRetrosRequest());
            return Ok(retros.Value.Retros.FirstOrDefault(r => r.Id == retroId));
        }
    }
}
