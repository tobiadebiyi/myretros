using System;
using System.Collections.Generic;

namespace Retros.Domain
{
    public class Group : Entity
    {
        public string Name { get; set; }
        public Retro Retro { get; set; }
        
        public ICollection<Comment> Comments { get; private set; }

        internal void AddComment(Comment comment)
        {
            this.Comments.Add(comment);
        }
    }
}