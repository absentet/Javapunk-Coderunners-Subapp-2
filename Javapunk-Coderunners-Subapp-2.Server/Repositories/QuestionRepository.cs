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
            .Include(q => q.Modules)
            .ToListAsync();
    }

    public async Task<Questions?> GetByIdWithAnswersAsync(int questionId)
    {
        return await _context.Questions
            .AsNoTracking()
            .Include(q => q.Answers)
            .Include(q => q.Modules)
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

    public async Task AddQuestionAsync(Questions question)
    {
        if (question.Modules is not null)
        {
            _context.Modules.Attach(question.Modules);
        }

        await _context.Questions.AddAsync(question);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateQuestionAsync(Questions question)
    {
        var existingQuestion = await _context.Questions
            .Include(q => q.Answers)
            .FirstOrDefaultAsync(q => q.Id == question.Id)
            ?? throw new InvalidOperationException($"A question with id {question.Id} does not exist");

        existingQuestion.Question_text = question.Question_text;

        if (question.Modules is not null)
        {
            _context.Modules.Attach(question.Modules);
            existingQuestion.Modules = question.Modules;
        }

        var existingAnswers = existingQuestion.Answers.OrderBy(answer => answer.Id).ToList();
        var answersToUpdate = Math.Min(existingAnswers.Count, question.Answers.Count);

        for (var i = 0; i < answersToUpdate; i++)
        {
            existingAnswers[i].Answer_text = question.Answers[i].Answer_text;
            existingAnswers[i].Is_correct = question.Answers[i].Is_correct;
        }

        if (existingAnswers.Count > question.Answers.Count)
        {
            _context.Answers.RemoveRange(existingAnswers.Skip(question.Answers.Count));
        }

        foreach (var answer in question.Answers.Skip(answersToUpdate))
        {
            existingQuestion.Answers.Add(new Answers
            {
                Answer_text = answer.Answer_text,
                Is_correct = answer.Is_correct
            });
        }

        await _context.SaveChangesAsync();
    }

    public async Task DeleteQuestionAsync(Questions question)
    {
        _context.Questions.Remove(question);
        await _context.SaveChangesAsync();
    }
}