using System;
using Microsoft.AspNetCore.Http;
using Retros.Application.Interfaces;

namespace Retros.Web.Providers 
{
    public class UserContextProvider : IUserContextProvider
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserContextProvider(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        // TODO Change to property
        public string GetUserId()
        {
            var userId = this.httpContextAccessor.HttpContext.Session.GetString("userId");
            return userId;
        }
    }
}