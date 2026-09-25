using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TheRefrigerator.Domain;

namespace TheRefrigerator.Application.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        //Acces program configuration
        private readonly IConfiguration _configuration;

        public JwtTokenService (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Generate Token Function
        public string GenerateToken(User user)
        {
            //create claims with user information
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.userName)
            };

            //the key of JWT
            var secret = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("Jwt:No Key.");

            // Convert the secret into a symmetric security key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            //Define JWT Encryption Form
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            //Create the token with all the function that need
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
            );

            // Convert the JWT object into a string and return
            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
