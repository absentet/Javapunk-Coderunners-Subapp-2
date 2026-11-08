using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Javapunk_Coderunners_Subapp_2.Server.Repositories;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;

public class QuizService : IQuizService
{
    private const int PointsPerCorrectAnswer = 10;

    private readonly IQuestionRepository _questionRepository;
    private readonly IModuleRepository _moduleRepository;
    private readonly ILogger<QuizService> _logger;
    private readonly Random _random = new();

    public QuizService(
        IQuestionRepository questionRepository,
        IModuleRepository moduleRepository,
        ILogger<QuizService> logger)
    {
        _questionRepository = questionRepository;
        _moduleRepository = moduleRepository;
        _logger = logger;
    }

    // Returns all modules so the client can show the module list.
    public async Task<List<ModuleDto>> GetModulesAsync()
    {
        try
        {
            var modules = await _moduleRepository.GetAllAsync();
            return modules.Select(m => new ModuleDto(m.Id, m.Module_name)).ToList();
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to get modules");
            throw;
        }
    }

    // Picks random questions from one module, with the answer options shuffled.
    public async Task<List<QuestionDto>> GetQuestionsForModuleAsync(int moduleId, int count = 10)
    {
        try
        {
            var questions = await _questionRepository.GetByModuleWithAnswersAsync(moduleId);
            return PickRandomQuestions(questions, count);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to get questions for module {ModuleId}", moduleId);
            throw;
        }
    }

    // Exam mode: random questions from all modules.
    public async Task<List<QuestionDto>> GetExamQuestionsAsync(int count = 10)
    {
        try
        {
            var questions = await _questionRepository.GetAllWithAnswersAsync();
            return PickRandomQuestions(questions, count);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to get exam questions");
            throw;
        }
    }
    public async Task<bool> CheckAnswerAsync(int questionId, int answerId)
    {
        try
        {
            var question = await _questionRepository.GetByIdWithAnswersAsync(questionId);

            if (question == null)
            {
                return false;
            }

            var answer = question.Answers
                .FirstOrDefault(a => a.Id == answerId);

            return answer?.Is_correct ?? false;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to check answer {AnswerId} for question {QuestionId}", answerId, questionId);
            throw;
        }
    }

    public async Task<int?> GetCorrectAnswerIdAsync(int questionId)
    {
        try
        {
            var question = await _questionRepository.GetByIdWithAnswersAsync(questionId);

            return question?.Answers.FirstOrDefault(a => a.Is_correct)?.Id;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to find the correct answer for question {QuestionId}", questionId);
            throw;
        }
    }
    public async Task<QuizResultDto> SubmitQuizAsync(List<AnswerSubmissionDto> answers)
    {
        try
        {
            var distinctAnswers = answers.DistinctBy(a => a.QuestionId).ToList();

            var questions = await _questionRepository.GetByIdsWithAnswersAsync(
                distinctAnswers.Select(a => a.QuestionId));

            int correctCount = 0;
            foreach (var submission in distinctAnswers)
            {
                var question = questions.FirstOrDefault(q => q.Id == submission.QuestionId);
                var chosenAnswer = question?.Answers.FirstOrDefault(a => a.Id == submission.AnswerId);

                if (chosenAnswer is { Is_correct: true })
                {
                    correctCount++;
                }
            }

            return new QuizResultDto(correctCount * PointsPerCorrectAnswer, correctCount, distinctAnswers.Count);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to calculate the quiz result");
            throw;
        }
    }

    private List<QuestionDto> PickRandomQuestions(List<Questions> questions, int count)
    {
        return questions
            .OrderBy(_ => _random.Next())
            .Take(count)
            .Select(ToQuestionDto)
            .ToList();
    }
    private QuestionDto ToQuestionDto(Questions question)
    {
        var answers = question.Answers
            .OrderBy(_ => _random.Next())
            .Select(a => new AnswerOptionDto(a.Id, a.Answer_text))
            .ToList();

        return new QuestionDto(question.Id, question.Question_text, answers);
    }
}