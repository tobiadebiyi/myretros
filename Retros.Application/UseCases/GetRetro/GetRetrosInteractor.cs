using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;

namespace Retros.Application.UseCases.GetRetros
{
    public class GetRetrosInteractor : IInteractor<GetRetrosRequest, OperationResult<IEnumerable<RetroDTO>>>
    {
        private readonly IRetroReposirotory retroRepository;
        private readonly IUserContextProvider userContextProvider;

        public GetRetrosInteractor(IRetroReposirotory retroRepository, IUserContextProvider userContextProvider)
        {
            this.retroRepository = retroRepository;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult<IEnumerable<RetroDTO>>> Handle(GetRetrosRequest request)
        {
            var userId = this.userContextProvider.GetUserId();
            var result = await this.retroRepository.GetByUserId(userId);

            var response = result.OrderByDescending(r => r.WhenCreated)
                                                 .Select(r => new RetroDTO(r, userId));

            return OperationResultCreator.Suceeded(response);
        }
    }
}