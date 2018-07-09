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
        public RetrosController()
        {
            GetRetroInteractor = new GetRetrosInteractor();
        }

        public IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>> GetRetroInteractor { get; }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok(await GetRetroInteractor.Handle(new GetRetrosRequest()));
        }
    }
}
