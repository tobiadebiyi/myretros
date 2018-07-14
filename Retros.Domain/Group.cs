using System;
using System.Collections.Generic;

namespace Retros.Domain
{
    public class Group : Entity
    {
        protected Group(){}

        public Group(string name)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
        }

        public string Name { get; protected set; }
        public Retro Retro { get; protected set; }
        public ICollection<Comment> Comments { get; protected set; } = new List<Comment>();

        internal void AddComment(Comment comment)
        {
            this.Comments.Add(comment);
        }
    }
}