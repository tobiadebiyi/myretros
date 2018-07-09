using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Projects.Repositories;
using Projects.UseCases.GetRetros;
using Retros.DataAccess;
using Retros.Domain;

namespace Projects
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddTransient<IRetroReposirotory, RetroReposirotory>();
            services.AddTransient<IInteractor<GetRetrosRequest, OperationResult<IEnumerable<Retro>>>, GetRetrosInteractor>();

            services.AddDbContext<RetrosContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("RetrosContext")));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
