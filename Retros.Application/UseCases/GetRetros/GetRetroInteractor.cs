using System.Linq;
using System.Threading.Tasks;
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

            return new OperationResult<RetroDTO>
            {
                Succeded = true,
                Value = new RetroDTO(result, this.userContextProvider.GetUserId())
            };
        }
    }
}