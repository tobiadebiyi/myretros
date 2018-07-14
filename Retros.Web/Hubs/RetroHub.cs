using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Projects.UseCases.GetRetros;
using Retros.Domain;

namespace Retros.Web.Hubs 
{
    public class RetroHub : Hub
    {
        readonly IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>> getRetros;

        public RetroHub(IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>> getRetros)
        {
            this.getRetros = getRetros;
        }

        public override async Task OnConnectedAsync()
        {
            await this.Clients.Caller.SendAsync("Connected", "Welcome to Retros");
        }
    }
}