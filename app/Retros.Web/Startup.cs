using System;
using System.Collections.Generic;
using System.IO;
using Application.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Retros.Application;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.AddComment;
using Retros.Application.UseCases.CreateRetro;
using Retros.Application.UseCases.DeleteRetro;
using Retros.Application.UseCases.GetRetro;
using Retros.Application.UseCases.GetRetros;
using Retros.Application.UseCases.UpdateComment;
using Retros.DataAccess;
using Retros.DataAccess.Repositories;
using Retros.Web.Hubs;
using Retros.Web.Providers;

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

            if (env.IsDevelopment())
            {
                app.UseCors(builder =>
                            builder.WithOrigins("http://localhost:3000")
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .AllowAnyMethod());
            }

            app.UseSession();
            app.Use(async (context, next) =>
            {
                var userId = context.Session.GetString("userId");
                if (userId == null)
                {
                    userId = Guid.NewGuid().ToString();
                    context.Session.SetString("userId", userId);
                };

                await next.Invoke();
            });

            app.UseDefaultFiles();

            app.UseStaticFiles();
            app.UseSignalR(routes => routes.MapHub<RetroHub>("/retrohub"));
            app.UseMvc();

            app.Run(async (context) =>
            {
                if (context.Response.StatusCode == StatusCodes.Status404NotFound)
                {
                    context.Response.ContentType = "text/html";
                    await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
                }
            });
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddTransient<IRetroReposirotory, RetroReposirotory>();
            services.AddTransient<IInteractor<GetRetrosRequest, OperationResult<IEnumerable<RetroDTO>>>, GetRetrosInteractor>();
            services.AddTransient<IInteractor<GetRetroRequest, OperationResult<RetroDTO>>, GetRetroInteractor>();
            services.AddTransient<IInteractor<AddCommentRequest, OperationResult<CommentDTO>>, AddCommentInteractor>();
            services.AddTransient<IInteractor<UpdateCommentRequest, OperationResult<UpdateCommentResponse>>, UpdateCommentInteractor>();
            services.AddTransient<IInteractor<CreateRetroRequest, OperationResult<RetroDTO>>, CreateRetroInteractor>();
            services.AddTransient<IInteractor<DeleteRetroRequest, OperationResult>, DeleteRetroInteractor>();

            services.AddTransient<IRequestPipelineMediator, RequestPipelineMediator>();

            services.AddDbContext<RetrosContext>(options =>
               options.UseNpgsql(Configuration.GetConnectionString("RetrosContext")));
            // services.AddDbContext<RetrosContext>(options =>
            //     options.UseSqlServer(Configuration.GetConnectionString("defaultconnection")));

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(7);
                options.Cookie.HttpOnly = true;
            });

            services.AddSignalR();

            services.AddHttpContextAccessor();
            services.AddTransient<IUserContextProvider, UserContextProvider>();
        }
    }
}