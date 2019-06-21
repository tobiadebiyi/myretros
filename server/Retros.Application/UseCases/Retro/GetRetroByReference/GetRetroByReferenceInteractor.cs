using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.GetRetroByReference
{
    public class GetRetroByReferenceInteractor : IInteractor<GetRetroByReferenceRequest, OperationResult<RetroDTO>>
    {
        readonly IRetroReposirotory retroRepository;
        readonly IUserContextProvider userContextProvider;

        public GetRetroByReferenceInteractor(
            IRetroReposirotory retroRepository,
            IUserContextProvider userContextProvider
            )
        {
            this.retroRepository = retroRepository;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<RetroDTO>> Handle(GetRetroByReferenceRequest request)
        {
            var result = await this.retroRepository.GetByReference(request.Reference);
            if (result == null) return OperationResultCreator.Failed<RetroDTO>($"Could not find a retro with the reference: '{request.Reference}'");

            return OperationResultCreator.Suceeded(new RetroDTO(result, this.userContextProvider.GetUserId()));
        }
    }
}