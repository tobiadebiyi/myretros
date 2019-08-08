using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Retros.Web
{
    public class Program
    {
        public static IWebHost BuildWebHost(string[] args) {
            var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
            var url = String.Concat("http://0.0.0.0:", port);

           return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls(url)
                .Build();
        }

        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            host.Run();
        }
    }
}