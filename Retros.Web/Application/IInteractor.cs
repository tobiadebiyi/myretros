using System.Threading.Tasks;

namespace Retros.Web.Application
{
    public interface IInteractor<TRequest, TResponse>
    {
        Task<TResponse> Handle(TRequest request);
    }
}