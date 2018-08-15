using System.Threading.Tasks;

namespace Application.Infrastructure
{
    public interface IInteractor<TRequest, TResponse>
    {
        Task<TResponse> Handle(TRequest request);
    }
}