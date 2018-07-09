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
        public Retro(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public ICollection<Group> Groups { get; set; }

        public void AddComment(Guid groupId, Comment comment)
        {
            var group = this.Groups.FirstOrDefault(g => g.Id == groupId );
            group.AddComment(comment);
        }
    }
}
