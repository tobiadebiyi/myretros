using System;

namespace Retros.Domain
{
    public class Action : Entity
    {
        protected Action()
        {
        }

        public Action(string value)
        {
            this.Text = value;
        }
        public string Text { get; protected set; }
        public Guid CommentId { get; protected set; }
        public Comment Comment { get; protected set; }
    }
}
