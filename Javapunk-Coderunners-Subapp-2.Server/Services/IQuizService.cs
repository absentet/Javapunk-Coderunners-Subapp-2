using Javapunk_Coderunners_Subapp_2.Server.Dtos;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;

public interface IQuizService
{
    Task<List<ModuleDto>> GetModulesAsync();
    Task<List<QuestionDto>> GetQuestionsForModuleAsync(int moduleId, int count = 10);
    Task<List<QuestionDto>> GetExamQuestionsAsync(int count = 10);

    Task<bool> CheckAnswerAsync(int questionId, int answerId);

    Task<int?> GetCorrectAnswerIdAsync(int questionId);

    Task<QuizResultDto> SubmitQuizAsync(List<AnswerSubmissionDto> answers);
}