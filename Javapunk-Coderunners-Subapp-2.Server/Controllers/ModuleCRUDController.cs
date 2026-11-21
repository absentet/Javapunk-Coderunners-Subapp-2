using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Javapunk_Coderunners_Subapp_2.Server.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class ModuleCRUDController : ControllerBase
{
    private readonly IModuleCRUDService _moduleCRUDService;

    public ModuleCRUDController(IModuleCRUDService moduleCRUDService)
    {
        _moduleCRUDService = moduleCRUDService;
    }

    // POST api/modulecrud/create
    [HttpPost("create")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> CreateModule(CreateModuleDto module)
    {
        await _moduleCRUDService.CreateModuleAsync(module);
        return Ok();
    }

    // PUT api/modulecrud/update
    [HttpPut("update")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> UpdateModule(ModuleDto module)
    {
        await _moduleCRUDService.UpdateModuleAsync(module);
        return Ok();
    }

    // DELETE api/modulecrud/delete
    [HttpDelete("delete")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> DeleteModule(String moduleId)
    {
        await _moduleCRUDService.DeleteModuleAsync(int.Parse(moduleId));
        return Ok();
    }

    // GET api/modulecrud/getall
    [HttpGet("getall")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> GetAllModules()
    {
        var modules = await _moduleCRUDService.GetAllModulesAsync();
        return Ok(modules);
    }

    // GET api/modulecrud/getwithid/{moduleId}
    [HttpGet("getwithid/{moduleId}")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> GetModuleWithId(String moduleId)
    {
        var module = await _moduleCRUDService.GetModuleWithId(int.Parse(moduleId));
        return Ok(module);
    }
}
