using Javapunk_Coderunners_Subapp_2.Server.Models;

namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;

// Data access for modules.
public interface IModuleRepository
{
    Task<List<Modules>> GetAllAsync();
}