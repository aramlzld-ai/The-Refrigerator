using System;
using System.Collections.Generic;
using System.Text;
using TheRefrigerator.Domain;

namespace TheRefrigerator.Application.Services
{
    public interface IJwtTokenService
    {
        string GenerateToken (User user);
    }
}
