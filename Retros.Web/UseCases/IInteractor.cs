using System.Threading.Tasks;

public interface IInteractor<TRequest, TResponse>
{
    Task<TResponse> Handle(TRequest request);
}