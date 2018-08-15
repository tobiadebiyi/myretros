using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.CreateRetro;
using Retros.Application.UseCases.DeleteRetro;
using Retros.Application.UseCases.GetRetro;
using Retros.Application.UseCases.GetRetros;
using Retros.Web.Hubs;

namespace Retros.Web.Controllers
{
    [Route("api/[controller]")]
    public class RetrosController : Controller
    {
        readonly IRequestPipelineMediator requestPipelineMediator;

        public RetrosController(IRequestPipelineMediator requestPipelineMediator)
        {
            this.requestPipelineMediator = requestPipelineMediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetRetros()
        {
            var response = await this.requestPipelineMediator.Handle<GetRetrosRequest,OperationResult<GetRetrosResponse>>(new GetRetrosRequest());
            return Ok(response);
        }

        [HttpGet]
        [Route("{retroId}")]
        public async Task<IActionResult> GetRetro(Guid retroId)
        {
            var retro = await this.requestPipelineMediator
                                  .Handle<GetRetroRequest, OperationResult<RetroDTO>>(new GetRetroRequest{RetroId = retroId});
            return Ok(retro.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRetro([FromBody]CreateRetroRequest request)
        {
            var retro = await this.requestPipelineMediator
                                  .Handle<CreateRetroRequest, OperationResult<RetroDTO>>(request);
            return Ok(retro);
        }
        [HttpDelete]
        [Route("{retroId}")]
        public async Task<IActionResult> DeleteRetro(Guid retroId)
        {
            var request = new DeleteRetroRequest { RetroId = retroId };
            var result = await this.requestPipelineMediator.Handle<DeleteRetroRequest, OperationResult>(request);

            return Ok(result);
        }
    }
}
