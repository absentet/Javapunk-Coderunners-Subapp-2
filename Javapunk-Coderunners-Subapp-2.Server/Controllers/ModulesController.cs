using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Javapunk_Coderunners_Subapp_2.Server.Data;
using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Javapunk_Coderunners_Subapp_2.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ModulesController : ControllerBase
{
    private readonly QuizDbContext _context;

    public ModulesController(QuizDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ModuleDto>>> GetModules()
    {
        var modules = await _context.Modules
        .AsNoTracking()
        .OrderBy(m => m.Id)
        .Select(m => new ModuleDto(m.Id, m.Module_name))
        .ToListAsync();

        return Ok(modules);
    }

    [HttpGet("progress")]
    public async Task<ActionResult<ModuleProgressDto>> GetProgress()
    {
        //TokenService puts the user ID in sub-part of the token
        string? userIdClaim =
            User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ??
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized();
        }

        //Newest row in Completed_modules for the user 
        int lastCompleted = await _context.Completed_modules
            .Where(cm => cm.Users.Id == userId && cm.Modules != null)
            .OrderByDescending(cm => cm.Id)
            .Select(cm => cm.Modules!.Id)
            .FirstOrDefaultAsync();

        return Ok(new ModuleProgressDto(lastCompleted));
    }
}
