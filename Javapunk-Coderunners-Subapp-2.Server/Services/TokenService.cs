using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Microsoft.IdentityModel.Tokens;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string CreateToken(Users user)
    {
        string keyText = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is missing in appsettings.json.");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyText));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.User_name)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}