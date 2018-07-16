using System.Threading.Tasks;

namespace Retros.Application.Interfaces
{
    public interface IInteractor<TRequest, TResponse>
    {
        Task<TResponse> Handle(TRequest request);
    }
}