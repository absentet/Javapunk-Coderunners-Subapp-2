using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Repositories;

namespace Javapunk_Coderunners_Subapp_2.Server.Services
{
    public class QnACRUDService : IQnACRUDService
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IModuleRepository _moduleRepository;

        private readonly ILogger<QnACRUDService> _logger;

        public QnACRUDService(
            IQuestionRepository questionRepository,
            IModuleRepository moduleRepository,
            ILogger<QnACRUDService> logger)
        {
            _questionRepository = questionRepository;
            _moduleRepository = moduleRepository;
            _logger = logger;
        }

        public async Task CreateQuestionAsync(UpsertQuestionDto question)
        {
            try
            {
                var module = await _moduleRepository.GetByIdAsync(question.ModuleId)
                    ?? throw new Exception($"A module with id {question.ModuleId} does not exist");

                var newQuestion = new Models.Questions
                {
                    Question_text = question.QuestionText,
                    Modules = module,
                    Answers = [.. question.Answers.Select(a => new Models.Answers
                {
                    Answer_text = a.AnswerText,
                    Is_correct = a.IsCorrect
                })]
                };

                await _questionRepository.AddQuestionAsync(newQuestion);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to create question");
                throw;
            }
        }

        public async Task DeleteQuestionAsync(int questionId)
        {
            try
            {
                var question = await _questionRepository.GetByIdWithAnswersAsync(questionId)
                    ?? throw new Exception($"A question with id {questionId} does not exist");

                await _questionRepository.DeleteQuestionAsync(question);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to delete question");
                throw;
            }
        }

        public async Task UpdateQuestionAsync(UpsertQuestionDto question, int questionId)
        {
            try
            {
                var module = await _moduleRepository.GetByIdAsync(question.ModuleId)
                    ?? throw new Exception($"A module with id {question.ModuleId} does not exist");

                var newQuestion = new Models.Questions
                {
                    Id = questionId,
                    Question_text = question.QuestionText,
                    Modules = module,
                    Answers = [.. question.Answers.Select(a => new Models.Answers
                {
                    Answer_text = a.AnswerText,
                    Is_correct = a.IsCorrect
                })]
                };

                await _questionRepository.UpdateQuestionAsync(newQuestion);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to edit question");
                throw;
            }
        }

        public async Task<IEnumerable<FetchQuestionDto>> GetAllQuestionsAsync()
        {
            try
            {
                var questions = await _questionRepository.GetAllWithAnswersAsync();
                var response = questions.Select(q => new FetchQuestionDto(
                    q.Id,
                    q.Modules!.Id,
                    q.Question_text,
                    [.. q.Answers.Select(a => new CreateAnswerOptionDto
                    (
                        a.Answer_text,
                        a.Is_correct
                    ))]
                ));
                return response;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to retrieve questions");
                throw;
            }
        }

        public async Task<FetchQuestionDto> GetQuestionWithId(int questionId)
        {
            try
            {
                var question = await _questionRepository.GetByIdWithAnswersAsync(questionId)
                    ?? throw new Exception($"A question with id {questionId} does not exist");

                return new FetchQuestionDto(
                    question.Id,
                    question.Modules!.Id,
                    question.Question_text,
                    [.. question.Answers.Select(answer => new CreateAnswerOptionDto(
                        answer.Answer_text,
                        answer.Is_correct))]
                );
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to retrieve question");
                throw;
            }
        }
    }
}
