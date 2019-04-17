using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Infrastructure;
using Retros.Application.DTOs;
using Retros.Application.Interfaces;
using Retros.Application.UseCases.Common;
using Retros.Domain;

namespace Retros.Application.UseCases.CreateRetro
{
    public class MakeGroupPublicInteractor : IInteractor<RetroGroupActionRequest, OperationResult>
    {
        readonly IRetroReposirotory retroReposirotory;
        readonly IUserContextProvider userContextProvider;

        public MakeGroupPublicInteractor(IRetroReposirotory retroReposirotory, IUserContextProvider userContextProvider)
        {
            this.retroReposirotory = retroReposirotory;
            this.userContextProvider = userContextProvider;
        }

        public async Task<OperationResult> Handle(RetroGroupActionRequest request)
        {
            var retro = await this.retroReposirotory.Get(request.RetroId);
            var userId = this.userContextProvider.GetUserId();

            if(userId != retro.OwnerId) 
                return OperationResultCreator.Failed();

            var group = retro.Groups.SingleOrDefault(g => g.Id == request.GroupId);
            group.MakeCommentsPublic();
            await this.retroReposirotory.Update(retro);
            return OperationResultCreator.Suceeded();
        }
    }
}
