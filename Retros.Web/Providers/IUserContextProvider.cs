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

        public string GetUserId()
        {
            var userId = this.httpContextAccessor.HttpContext.Session.GetString("userId");
            if (userId == null)
            {
                userId = Guid.NewGuid().ToString();
                this.httpContextAccessor.HttpContext.Session.SetString("userId", userId);
            }
            
            return userId;
        }
    }
}