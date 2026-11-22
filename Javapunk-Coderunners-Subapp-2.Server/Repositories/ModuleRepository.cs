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

    public async Task AddModuleAsync(Modules module)
    {
        await _context.Modules.AddAsync(module);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteModuleAsync(Modules module)
    {
        var linkedQuestions = await _context.Questions.Where(q => q.Modules == module).ToListAsync();
        var linkedCompletedModules = await _context.Completed_modules.Where(cm => cm.Modules == module).ToListAsync();

        _context.Questions.RemoveRange(linkedQuestions);
        _context.Completed_modules.RemoveRange(linkedCompletedModules);
        _context.Modules.Remove(module);

        await _context.SaveChangesAsync();
    }

    public async Task<List<Modules>> GetAllAsync()
    {
        return await _context.Modules
            .AsNoTracking()
            .OrderBy(m => m.Id)
            .ToListAsync();
    }

    public async Task<Modules?> GetByIdAsync(int moduleId)
    {
        return await _context.Modules
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.Id == moduleId);
    }

    public async Task UpdateModuleAsync(Modules module)
    {
        var existingModule = await _context.Modules.FindAsync(module.Id) ?? throw new Exception($"A module with id {module.Id} does not exist");

        existingModule.Module_name = module.Module_name;
        
        _context.Modules.Update(existingModule);
        await _context.SaveChangesAsync();
    }
}