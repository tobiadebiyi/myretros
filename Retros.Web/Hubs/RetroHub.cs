using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Retros.Web.Application;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.Hubs 
{
    public class RetroHub : Hub
    {
        readonly IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetros;

        public RetroHub(IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>> getRetros)
        {
            this.getRetros = getRetros;
        }

        public override async Task OnConnectedAsync()
        {
            await this.Clients.Caller.SendAsync("Connected", "Welcome to Retros");
        }
    }
}