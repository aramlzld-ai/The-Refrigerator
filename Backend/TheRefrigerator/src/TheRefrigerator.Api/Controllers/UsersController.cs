using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheRefrigerator.Application;
using TheRefrigerator.Application.Services;
using TheRefrigerator.Domain;
using TheRefrigerator.Persistance;

namespace TheRefrigerator.Api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly TheRefrigeratorDBContext _context;
        private readonly IPasswordHasher<User> _hasher;
        private readonly IJwtTokenService _jwtTokenService;
        public UsersController(TheRefrigeratorDBContext context, IPasswordHasher<User> hasher, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _hasher = hasher;
            _jwtTokenService = jwtTokenService;
        }

        //Register
        [HttpPost("create-user")]
        public IActionResult AddUser(CreateUserDTO createUserDTO)
        { 
            var newUser = new User
            {
                userName = createUserDTO.userName,
                emailUser = createUserDTO.emailUser,
                passwordHash = "",
            };
            var checkUser = _context.Users.FirstOrDefault(u => u.userName == newUser.userName || u.emailUser == newUser.emailUser);
            if (checkUser != null) {
                return Conflict("Usuario ya registrado");
            }
            var passwordHashed = _hasher.HashPassword(newUser, createUserDTO.passwordUser);
            newUser.passwordHash = passwordHashed;
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return Created();
        }
        //Login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            var user = _context.Users.FirstOrDefault(u => u.emailUser == loginRequestDTO.UserNameOrEmail || u.userName == loginRequestDTO.UserNameOrEmail);
            if (user == null) {
                return Unauthorized("Credenciales Incorrectas");
            }
            var checkPassword = _hasher.VerifyHashedPassword(user, user.passwordHash, loginRequestDTO.Password);
            if (checkPassword == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Credenciales Incorrectas");
            }
            var response = new LoginResponseDTO
            {
                IdUser = user.Id,
                UserName = user.userName,
                EmailUser = user.emailUser,
                AccessToken = _jwtTokenService.GenerateToken(user)
            };
            return Ok(response);
        }
    }
}
