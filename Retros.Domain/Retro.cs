using System;
using System.Collections.Generic;
using System.Linq;

namespace Retros.Domain
{
    public class Retro : Entity
    {
        protected Retro()
        {
            
        }
        public Retro(string name, string userId)
        {
            Name = name;
            UserId = userId;
        }

        public string Name { get; protected set; }
        public string UserId { get; protected set; }
        public ICollection<Group> Groups { get; protected set; } = new List<Group>();

        public void AddGroup(Group group)
        {
            if(this.Groups.Any(g => g.Name == group.Name))
                throw new InvalidOperationException($"There is already a group with this name: {group.Name}");
            
            this.Groups.Add(group);
        }

        public void AddComment(Guid groupId, Comment comment)
        {
            var group = this.Groups.FirstOrDefault(g => g.Id == groupId );
            group.AddComment(comment);
        }

        public void WithDefaultGroups() 
        {
            this.Groups.Add(new Group("What went well"));
            this.Groups.Add(new Group("Not so well"));
            this.Groups.Add(new Group("Actions"));
        }
    }
}
