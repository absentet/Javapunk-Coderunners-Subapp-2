using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Repositories;

namespace Javapunk_Coderunners_Subapp_2.Server.Services
{
    public class ModuleCRUDService : IModuleCRUDService
    {
        private readonly IModuleRepository _moduleRepository;

        private readonly ILogger<ModuleCRUDService> _logger;

        public ModuleCRUDService(
            IModuleRepository moduleRepository,
            ILogger<ModuleCRUDService> logger)
        {
            _moduleRepository = moduleRepository;
            _logger = logger;
        }

        public async Task CreateModuleAsync(CreateModuleDto module)
        {
            try
            {
                var newModule = new Models.Modules
                {
                    Module_name = module.ModuleName
                };

                await _moduleRepository.AddModuleAsync(newModule);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to create module");
                throw;
            }
        }

        public async Task DeleteModuleAsync(int moduleId)
        {
            try
            {
                var module = await _moduleRepository.GetByIdAsync(moduleId)
                    ?? throw new Exception($"A module with id {moduleId} does not exist");

                await _moduleRepository.DeleteModuleAsync(module);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to delete module");
                throw;
            }
        }

        public async Task UpdateModuleAsync(ModuleDto moduleDto)
        {
            try
            {
                var module = await _moduleRepository.GetByIdAsync(moduleDto.Id)
                    ?? throw new Exception($"A module with id {moduleDto.Id} does not exist");

                var newModule = new Models.Modules
                {
                    Id = moduleDto.Id,
                    Module_name = moduleDto.Name
                };

                await _moduleRepository.UpdateModuleAsync(newModule);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to edit module");
                throw;
            }
        }

        public async Task<IEnumerable<ModuleDto>> GetAllModulesAsync()
        {
            try
            {
                var modules = await _moduleRepository.GetAllAsync();
                var response = modules.Select(m => new ModuleDto(
                    m.Id,
                    m.Module_name
                ));
                return response;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to retrieve modules");
                throw;
            }
        }
                  
        public async Task<ModuleDto> GetModuleWithId(int moduleId)
        {
            try
            {
                var module = await _moduleRepository.GetByIdAsync(moduleId)
                    ?? throw new Exception($"A module with id {moduleId} does not exist");

                return new ModuleDto(
                    module.Id,
                    module.Module_name
                );
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to retrieve module");
                throw;
            }
        }
    }
}
