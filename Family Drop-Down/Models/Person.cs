namespace Family_Drop_Down.Models
{
    public class Person
    {
        public string Id { get; set; }
        public int FamilyTreeId { get; set; }
        public string GivenName { get; set; }
        public string Surname { get; set; }
        public Gender Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? BirthLocation { get; set; }
        public DateTime? DeathDate { get; set; }
        public string? DeathLocation { get; set; }
    }

    public enum Gender
    {
        Male,
        Female,
        Other,
        Unknown
    }
}
