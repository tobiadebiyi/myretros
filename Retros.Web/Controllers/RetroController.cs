using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Projects.UseCases.GetRetros;
using Retros.Domain;

namespace Projects.Controllers
{
    [Route("api/[controller]")]
    public class RetrosController : Controller
    {
        private readonly IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>> GetRetroInteractor;

        public RetrosController(IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>> getRetroInteractor)
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
