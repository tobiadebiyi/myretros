using System;
using System.Threading.Tasks;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Domain;

namespace Retros.Application.UseCases.CreateRetro
{
    public class CreateRetroInteractor : IInteractor<CreateRetroRequest, OperationResult<RetroDTO>>
    {
        readonly IRetroReposirotory retroReposirotory;

        public CreateRetroInteractor(IRetroReposirotory retroReposirotory)
        {
            this.retroReposirotory = retroReposirotory;
        }

        public async Task<OperationResult<RetroDTO>> Handle(CreateRetroRequest request)
        {
            var newRetro = new Retro(request.RetroName);

            if(request.WithDefaultGroups)
            {
                newRetro.WithDefaultGroups();
            }

            var retro = await this.retroReposirotory.Add(newRetro);
            return OperationResultCreator.Suceeded(new RetroDTO(retro));
        }
    }
}
