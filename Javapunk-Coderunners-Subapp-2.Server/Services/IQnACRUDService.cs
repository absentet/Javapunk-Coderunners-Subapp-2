using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Models;

namespace Javapunk_Coderunners_Subapp_2.Server.Services
{
    public interface IQnACRUDService
    {
        Task CreateQuestionAsync(UpsertQuestionDto question);
        Task UpdateQuestionAsync(UpsertQuestionDto question, int questionId);
        Task DeleteQuestionAsync(int questionId);
        Task<IEnumerable<FetchQuestionDto>> GetAllQuestionsAsync();
        Task<FetchQuestionDto> GetQuestionWithId(int questionId);
    }
}
