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
        }

        protected string _tags;
        public string Name { get; protected set; }
        public Retro Retro { get; protected set; }
        public ICollection<Comment> Comments { get; protected set; } = new List<Comment>();
        public ICollection<string> Tags => _tags.Split(',');

        internal void AddComment(Comment comment)
        {
            this.Comments.Add(comment);
        }

        internal void AddTag(string tagName)
        {
            if (this._tags.Split(',').Any(t => t == tagName))
                return;
            this._tags = $"{_tags},{tagName}";
        }
    }
}