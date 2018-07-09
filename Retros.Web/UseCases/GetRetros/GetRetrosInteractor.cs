using System.Collections.Generic;
using System.Threading.Tasks;
using Retros.Domain;

namespace Projects.UseCases.GetRetros
{
    public class GetRetrosInteractor : IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>>
    {
        public GetRetrosInteractor()
        {
        }

        public async Task<OperationResult<IEnumerable<Retro>>> Handle(GetRetrosRequest request)
        {
            var result = new List<Retro> {
                new Retro("test retro")
            };

            return new OperationResult<IEnumerable<Retro>>
            {
                Succeded = true,
                Value = result
            };
        }
    }
}