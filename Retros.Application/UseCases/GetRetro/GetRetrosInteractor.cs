using System.Linq;
using System.Threading.Tasks;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.GetRetros
{
    public class GetRetrosInteractor : IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>>
    {
        private readonly IRetroReposirotory retroRepository;
        private readonly IUserContextProvider userContextProvider;

        public GetRetrosInteractor(IRetroReposirotory retroRepository, IUserContextProvider userContextProvider)
        {
            this.retroRepository = retroRepository;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<GetRetrosResponse>> Handle(GetRetrosRequest request)
        {
            var userId = this.userContextProvider.GetUserId();
            var result = await this.retroRepository.GetByUserId(userId);
            if (result == null) return OperationResultCreator.Failed<GetRetrosResponse>("Retro not found");

            var response = new GetRetrosResponse(result
                                                 .OrderByDescending(r => r.WhenCreated)
                                                 .Select(r => new RetroDTO(r, userId)));

            return OperationResultCreator.Suceeded(response);
        }
    }
}