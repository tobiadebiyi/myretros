using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Projects.Repositories;
using Retros.Domain;
using Retros.Web.Application;
using Retros.Web.UseCases.GetRetros;

namespace Projects.UseCases.GetRetros
{
    public class GetRetrosInteractor : IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>>
    {
        private readonly IRetroReposirotory retroRepository;

        public GetRetrosInteractor(IRetroReposirotory retroRepository)
        {
            this.retroRepository = retroRepository;
        }

        public async Task<OperationResult<GetRetrosResponse>> Handle(GetRetrosRequest request)
        {
            var result = await this.retroRepository.Get();
            var response = new GetRetrosResponse(result.Select(r => new RetroDTO(r)));

            return new OperationResult<GetRetrosResponse>
            {
                Succeded = true,
                Value = response
            };
        }
    }
}