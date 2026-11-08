using Javapunk_Coderunners_Subapp_2.Server.Data;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;

public class ModuleRepository : IModuleRepository
{
    private readonly QuizDbContext _context;

    public ModuleRepository(QuizDbContext context)
    {
        _context = context;
    }

    public async Task<List<Modules>> GetAllAsync()
    {
        return await _context.Modules
            .AsNoTracking()
            .OrderBy(m => m.Id)
            .ToListAsync();
    }
}