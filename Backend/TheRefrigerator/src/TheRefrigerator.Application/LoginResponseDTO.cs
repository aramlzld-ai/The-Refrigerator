
namespace TheRefrigerator.Application
{
    public class LoginResponseDTO
    {
        public required Guid IdUser {  get; set; }
        public required string UserName { get; set; }
        public required string EmailUser { get; set; }
        public required string AccessToken { get; set; }
    }
}
