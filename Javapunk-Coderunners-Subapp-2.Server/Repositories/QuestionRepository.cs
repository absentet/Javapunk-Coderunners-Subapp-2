using Javapunk_Coderunners_Subapp_2.Server.Data;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;

public class QuestionRepository : IQuestionRepository
{
    private readonly QuizDbContext _context;

    public QuestionRepository(QuizDbContext context)
    {
        _context = context;
    }

    public async Task<List<Questions>> GetByModuleWithAnswersAsync(int moduleId)
    {
        return await _context.Questions
            .AsNoTracking()
            .Include(q => q.Answers)
            .Where(q => q.Modules != null && q.Modules.Id == moduleId)
            .ToListAsync();
    }

    public async Task<List<Questions>> GetAllWithAnswersAsync()
    {
        return await _context.Questions
            .AsNoTracking()
            .Include(q => q.Answers)
            .ToListAsync();
    }

    public async Task<Questions?> GetByIdWithAnswersAsync(int questionId)
    {
        return await _context.Questions
            .AsNoTracking()
            .Include(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == questionId);
    }

    public async Task<List<Questions>> GetByIdsWithAnswersAsync(IEnumerable<int> questionIds)
    {
        var ids = questionIds.ToList();

        return await _context.Questions
            .AsNoTracking()
            .Include(q => q.Answers)
            .Where(q => ids.Contains(q.Id))
            .ToListAsync();
    }
}