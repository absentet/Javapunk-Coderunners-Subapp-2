using Javapunk_Coderunners_Subapp_2.Server.Dtos;

namespace Javapunk_Coderunners_Subapp_2.Server.Services
{
    public interface IModuleCRUDService
    {
        Task CreateModuleAsync(CreateModuleDto module);
        Task UpdateModuleAsync(ModuleDto module);
        Task DeleteModuleAsync(int moduleId);
        Task<IEnumerable<ModuleDto>> GetAllModulesAsync();
        Task<ModuleDto> GetModuleWithId(int moduleId);
    }
}
