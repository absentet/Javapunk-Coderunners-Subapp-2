using Javapunk_Coderunners_Subapp_2.Server.Models;
 
namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;
 
// Data access for questions. 
public interface IQuestionRepository
{
    Task<List<Questions>> GetByModuleWithAnswersAsync(int moduleId);
    Task<List<Questions>> GetAllWithAnswersAsync();
    Task<Questions?> GetByIdWithAnswersAsync(int questionId);
    Task<List<Questions>> GetByIdsWithAnswersAsync(IEnumerable<int> questionIds);
}
 