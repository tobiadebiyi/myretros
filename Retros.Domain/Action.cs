namespace Retros.Domain
{
    public class Action : Entity
    {
        protected Action()
        {
        }

        public Action(string value)
        {
            this.Value = value;
        }
        public string Value { get; protected set; }
        public Comment Comment { get; protected set; }
    }
}
