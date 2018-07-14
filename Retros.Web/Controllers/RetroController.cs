using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Projects.UseCases.GetRetros;
using Retros.Domain;
using Retros.Web.UseCases.GetRetros;

namespace Projects.Controllers
{
    [Route("api/[controller]")]
    public class RetrosController : Controller
    {
        private readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> GetRetroInteractor;

        public RetrosController(IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetroInteractor)
        {
            GetRetroInteractor = getRetroInteractor;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await GetRetroInteractor.Handle(new GetRetrosRequest()));
        }
    }
}
