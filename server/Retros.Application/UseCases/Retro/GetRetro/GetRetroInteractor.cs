using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.GetRetro
{
    public class GetRetroInteractor : IInteractor<GetRetroRequest, OperationResult<RetroDTO>>
    {
        readonly IRetroReposirotory retroRepository;
        readonly IUserContextProvider userContextProvider;

        public GetRetroInteractor(
            IRetroReposirotory retroRepository,
            IUserContextProvider userContextProvider
            )
        {
            this.retroRepository = retroRepository;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<RetroDTO>> Handle(GetRetroRequest request)
        {
            var result = await this.retroRepository.Get(request.RetroId);
            if (result == null) return OperationResultCreator.Failed<RetroDTO>($"Could not find a retro with the id: '{request.RetroId}'");

            return OperationResultCreator.Suceeded(new RetroDTO(result, this.userContextProvider.GetUserId()));
        }
    }
}