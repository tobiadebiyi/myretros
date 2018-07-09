using System.Collections.Generic;
using System.Threading.Tasks;
using Projects.Repositories;
using Retros.Domain;

namespace Projects.UseCases.GetRetros
{
    public class GetRetrosInteractor : IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>>
    {
        private readonly IRetroReposirotory retroRepository;

        public GetRetrosInteractor(IRetroReposirotory retroRepository)
        {
            this.retroRepository = retroRepository;
        }

        public async Task<OperationResult<IEnumerable<Retro>>> Handle(GetRetrosRequest request)
        {
            var result = await this.retroRepository.Get();

            return new OperationResult<IEnumerable<Retro>>
            {
                Succeded = true,
                Value = result
            };
        }
    }
}