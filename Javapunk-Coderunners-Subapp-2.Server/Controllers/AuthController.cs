using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Javapunk_Coderunners_Subapp_2.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Javapunk_Coderunners_Subapp_2.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;

    public AuthController(IUserService userService, ITokenService tokenService, IConfiguration configuration)
    {
        _userService = userService;
        _tokenService = tokenService;
        _configuration = configuration;
    }

    // POST api/auth/register
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        if (await _userService.GetUserWithUserNameAsync(request.Username) != null)
        {
            return Conflict("User with this name already exists.");
        }

        Users? user = await _userService.CreateUserAsync(request.Username, request.Password);

        if (user == null)
        {
            return BadRequest("Could not create user. The username must be 3-20 characters and the password cannot be empty.");
        }

        return Ok(new AuthResponse(_tokenService.CreateToken(user), user.Id, user.User_name));
    }

    // POST api/auth/login
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        Users? user = await _userService.LoginAsync(request.Username, request.Password);

        if (user == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        return Ok(new AuthResponse(_tokenService.CreateToken(user), user.Id, user.User_name));
    }

    [HttpPost("admin-login")]
    public IActionResult AdminLogin ([FromBody] AdminLoginRequest request)
    {
        var expectedPassword = _configuration["Admin:Password"];

        if (string.IsNullOrEmpty(expectedPassword) ||
            request.Password != expectedPassword)
        {
            return Unauthorized("Invalid admin password.");
        }

        var token = _tokenService.CreateAdminToken();

        return Ok(new AdminLoginResponse(token,true));
    }
}