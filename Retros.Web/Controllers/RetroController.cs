﻿using System;
using System.Linq;
using System.Threading.Tasks;
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
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor;
        readonly IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor;
        readonly IInteractor<CreateRetroRequest, OperationResult<RetroDTO>> createRetroInteractor;
        readonly IInteractor<DeleteRetroRequest, OperationResult> deleteRetroInteractor;
        readonly IHubContext<RetroHub> retroHub;

        public RetrosController(
            IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetrosInteractor,
            IInteractor<GetRetroRequest, OperationResult<RetroDTO>> getRetroInteractor,
            IInteractor<CreateRetroRequest, OperationResult<RetroDTO>> createRetroInteractor,
            IInteractor<DeleteRetroRequest, OperationResult> deleteRetroInteractor,
            IHubContext<RetroHub> retroHub
        )
        {            
            this.getRetrosInteractor = getRetrosInteractor;
            this.getRetroInteractor = getRetroInteractor;
            this.createRetroInteractor = createRetroInteractor;
            this.deleteRetroInteractor = deleteRetroInteractor;
            this.retroHub = retroHub;
        }

        [HttpGet]
        public async Task<IActionResult> GetRetros()
        {
            return Ok(await getRetrosInteractor.Handle(new GetRetrosRequest()));
        }

        [HttpGet]
        [Route("{retroId}")]
        public async Task<IActionResult> GetRetro(Guid retroId)
        {
            var retro = await getRetroInteractor.Handle(new GetRetroRequest{RetroId = retroId});
            return Ok(retro.Value);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRetro([FromBody]CreateRetroRequest request)
        {
            var retro = await this.createRetroInteractor.Handle(request);
            return Ok(retro);
        }
        [HttpDelete]
        [Route("{retroId}")]
        public async Task<IActionResult> DeleteRetro(Guid retroId)
        {
            var request = new DeleteRetroRequest { RetroId = retroId };
            var result = await this.deleteRetroInteractor.Handle(request);

            return Ok(result);
        }
    }
}
