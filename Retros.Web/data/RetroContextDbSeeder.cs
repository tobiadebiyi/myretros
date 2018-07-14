using System.Collections.Generic;
using System.Threading.Tasks;
using Retros.DataAccess;
using Retros.Domain;

namespace Retros.Web.Data 
{
    public class RetroContextDbSeeder
    {
        readonly RetrosContext context;

        public RetroContextDbSeeder(RetrosContext context)
        {
            this.context = context;
        }
        public async Task Initialize()
        {
            var group1 = new Group("What went well");
            var group2 = new Group("Not so well");
            var group3 = new Group("Actions");

            var retro1 = new Retro("TestRetro");
            retro1.AddGroup(group1);
            retro1.AddGroup(group2);
            retro1.AddGroup(group3);

            retro1.AddComment(group1.Id, new Comment("first comment"));
            retro1.AddComment(group1.Id, new Comment("second comment"));
            retro1.AddComment(group1.Id, new Comment("third comment"));

            retro1.AddComment(group2.Id, new Comment("first bad comment"));
            retro1.AddComment(group2.Id, new Comment("second bad comment"));
            retro1.AddComment(group2.Id, new Comment("third bad comment"));

            retro1.AddComment(group3.Id, new Comment("first action comment"));
            retro1.AddComment(group3.Id, new Comment("second action comment"));
            retro1.AddComment(group3.Id, new Comment("third action comment"));

            context.Retros.Add(retro1);
            await context.SaveChangesAsync();
        }
    }
}