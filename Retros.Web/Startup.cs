using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Projects.Repositories;
using Projects.UseCases.GetRetros;
using Retros.DataAccess;
using Retros.Domain;
using Retros.Web.Application;
using Retros.Web.Hubs;
using Retros.Web.UseCases.GetRetros;
using System.Collections.Generic;

namespace Retros.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder =>
                        builder.WithOrigins("http://localhost:3000")
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            
            app.UseSignalR(routes => routes.MapHub<RetroHub>("/retrohub"));
            app.UseMvc();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddTransient<IRetroReposirotory, RetroReposirotory>();
            services.AddTransient<IInteractor<GetRetrosRequest, OperationResult<GetRetrosResponse>>, GetRetrosInteractor>();

            services.AddDbContext<RetrosContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("RetrosContext")));

            services.AddSignalR();
        }
    }
}