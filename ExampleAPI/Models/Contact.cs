namespace ExampleAPI.Models
{
    public class Contact
    {
        public string? Id { get; set; }
        public string? userId { get; set; }
        public ContactType type { get; set; }
        public string? info { get; set; }
    }
}
