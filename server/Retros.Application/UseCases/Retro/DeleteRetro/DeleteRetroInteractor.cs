using System;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.DeleteRetro
{
    public class DeleteRetroInteractor : IInteractor<DeleteRetroRequest, OperationResult>
    {
        readonly IRetroReposirotory retroReposirotory;

        public DeleteRetroInteractor(IRetroReposirotory retroReposirotory)
        {
            this.retroReposirotory = retroReposirotory;
        }

        public async Task<OperationResult> Handle(DeleteRetroRequest request)
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);
            if (retro == null)
                throw new InvalidOperationException("Retro was not found");
            
            await this.retroReposirotory.Delete(retro);
            return OperationResultCreator.Suceeded();
        }
    }
}
