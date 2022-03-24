namespace ComplaintsRegister.Models
{
    public class Complaint
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? EmailAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ResidentialAddress { get; set; }
        public string? Description { get; set; }
        public int Status { get; set; }
    }
}
