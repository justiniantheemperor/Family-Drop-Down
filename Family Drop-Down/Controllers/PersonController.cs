using Family_Drop_Down.Models;
using Microsoft.AspNetCore.Mvc;

namespace Family_Drop_Down.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private static readonly IEnumerable<Person> People = new[]
        {
            new Person
            {
                Id = "b4cd5643-dfae-5a6a-9f03-ec13ec73a653",
                FamilyTreeId = 1,
                GivenName = "Jane",
                Surname = "Doe",
                Gender = Gender.Female,
                BirthDate = new DateTime(1877, 1, 1),
                BirthLocation = "Somewhere",
                DeathDate = new DateTime(1941, 12, 31),
                DeathLocation = "Somewhere Else"
            }
            // populate more later
        };

        [HttpGet("{familytreeid:int}")]

        public Person[] Get(int familytreeid)
        {
            Person[] people = People.Where(i => i.FamilyTreeId == familytreeid).ToArray();
            return people;
        }
    }
}

