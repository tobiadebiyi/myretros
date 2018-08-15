using System;
using System.Threading.Tasks;

namespace Application.Infrastructure
{
    public class RequestPipelineMediator : IRequestPipelineMediator
    {
        readonly IServiceProvider serviceProvider;

        public RequestPipelineMediator(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task<TResponse> Handle<TRequest, TResponse>(TRequest request)
        {
            var handler = this.GetType<IInteractor<TRequest, TResponse>>();
            return await handler.Handle(request);
        }

        T GetType<T>()
        {
            return (T)this.serviceProvider.GetService(typeof(T));
        }
    }
}
