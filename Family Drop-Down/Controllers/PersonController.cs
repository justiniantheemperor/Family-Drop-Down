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
                BirthLocation = "New York City, NY",
                DeathDate = new DateTime(1941, 12, 31),
                DeathLocation = "Lehi, UT"
            },
           new Person
            {
                Id = "c32b846d-134e-5cd0-b465-07f252c9616b",
                FamilyTreeId = 1,
                GivenName = "Oliver",
                Surname = "Smith",
                Gender = Gender.Male,
                BirthDate = null,
                BirthLocation = null,
                DeathDate = new DateTime(1910, 10, 04),
                DeathLocation = "Draper, UT"
            },
           new Person
            {
                Id = "e385e979-38dd-51b6-86e7-db1f6457adcf",
                FamilyTreeId = 2,
                GivenName = "Emily R",
                Surname = "Atkinson",
                Gender = Gender.Other,
                BirthDate = new DateTime(1980, 11, 09),
                BirthLocation = "Provo, UT",
                DeathDate = null,
                DeathLocation = null
            },
                      new Person
            {
                Id = "f367f979-23ed-32a6-86e7-db1f1223adcf",
                FamilyTreeId = 2,
                GivenName = "Jason R",
                Surname = "Lucas",
                Gender = Gender.Male,
                BirthDate = null,
                BirthLocation = null,
                DeathDate = null,
                DeathLocation = null
            }

        };

        [HttpGet("{familytreeid:int}")]

        public Person[] Get(int familytreeid)
        {
            Person[] people = People.Where(i => i.FamilyTreeId == familytreeid).ToArray();
            return people;
        }
    }
}

