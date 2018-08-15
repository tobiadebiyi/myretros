using System.Threading.Tasks;

namespace Application.Infrastructure
{
    public interface IRequestPipelineMediator
    {
        Task<TResponse> Handle<TRequest, TResponse>(TRequest request);
    }
}
