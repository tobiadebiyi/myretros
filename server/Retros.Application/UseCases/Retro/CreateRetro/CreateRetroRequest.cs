namespace Retros.Application.UseCases.CreateRetro
{
    public class CreateRetroRequest
    {
        public string RetroName { get; set; }
        public bool WithDefaultGroups { get; set; }
    }
}