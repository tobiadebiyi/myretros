using Retros.Domain;

namespace Retros.Web.Data 
{
    public class DatabaseSeeder {
        public void Initialize(RetrosContext contect)
        {
            var retros = new List<Retro> {
                new Retro 
                {
			name: "TestRetro",
			groups: [
				{
					name: "What went well",
					comments: [
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: false },
						{ text: "First Comment", isActiveUser: false },
						{ text: "First Comment", isActiveUser: false },
					],
				},
				{
					name: "Not so well",
					comments: [
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: false },
					],
				},
				{
					name: "Actions",
					comments: [
						{ text: "First Comment", isActiveUser: true },
						{ text: "First Comment", isActiveUser: true },
					]
				}
			]
		}
            }
        }
    }
}