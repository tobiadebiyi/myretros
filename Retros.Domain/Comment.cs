namespace Retros.Domain {
    public class Comment : Entity
    {
        public Comment(string text)
        {
            Text = text;
        }

        public string Text { get; }
        public Group Retro { get; }
    }
}