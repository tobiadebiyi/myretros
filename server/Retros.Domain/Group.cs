using System;
using System.Collections.Generic;
using System.Linq;

namespace Retros.Domain
{
    public class Group : Entity
    {
        protected Group(){}

        public Group(string name)
        {
            this.Name = name;
            this.AddTag("First");
            this.Open = false;
        }

        public string Name { get; protected set; }
        public Retro Retro { get; protected set; }
        public ICollection<Comment> Comments { get; protected set; } = new List<Comment>();
        public ICollection<Tag> Tags { get; protected set; } = new List<Tag>();
        public bool Open { get; protected set; }

        internal void AddComment(Comment comment)
        {
            this.Comments.Add(comment);
        }

        internal void AddTag(string tagName)
        {
            if (this.Tags.Any(t => t.Value == tagName))
                return;

            this.Tags.Add(new Tag(tagName));
        }

        internal void OpenForComments() 
        {
            this.Open = true;
        }

        internal void ClodeForComments() 
        {
            this.Open = true;
        }
    }
}