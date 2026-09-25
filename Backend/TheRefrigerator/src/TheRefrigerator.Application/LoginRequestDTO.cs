
namespace TheRefrigerator.Application
{
    public class LoginRequestDTO
    {
        public required string UserNameOrEmail {  get; set; }
        public required string Password { get; set; }
    }
}
