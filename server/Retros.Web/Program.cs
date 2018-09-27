using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Retros.Web
{
    public class Program
    {
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                    // .ConfigureLogging((hostingContext, logging) =>
                    // {
                    //     logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    //     logging.AddConsole();
                    //     logging.AddDebug();
                    // })
                .UseStartup<Startup>()
                .Build();

        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            host.Run();
        }
    }
}