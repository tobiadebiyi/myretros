using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.CreateRetro;
using Retros.Application.UseCases.GetRetros;

namespace Retros.Web.Controllers
{
    [Route("api/[controller]")]
    public class RetrosController : Controller
    {
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor;
        readonly IInteractor<CreateRetroRequest, OperationResult<RetroDTO>> createRetroInteractor;

        public RetrosController(
            IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor,
            IInteractor<CreateRetroRequest, OperationResult<RetroDTO>> createRetroInteractor
        )
        {
            this.getRetroInteractor = getRetroInteractor;
            this.createRetroInteractor = createRetroInteractor;
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

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateRetro([FromBody]CreateRetroRequest request)
        {
            var retro = await this.createRetroInteractor.Handle(request);
            return Ok(retro);
        }
    }
}
