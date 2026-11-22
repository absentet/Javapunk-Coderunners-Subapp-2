namespace Javapunk_Coderunners_Subapp_2.Server.Dtos;

public record ModuleDto(int Id, string Name);
public record CreateModuleDto(string ModuleName);

public record ModuleProgressDto(int LastCompletedModule);

public record AnswerOptionDto(int Id, string Text);

public record QuestionDto(int Id, string Text, List<AnswerOptionDto> Answers);

public record CheckAnswerRequest(int QuestionId, int AnswerId);

public record CheckAnswerResponse(bool IsCorrect, int? CorrectAnswerId);

public record AnswerSubmissionDto(int QuestionId, int AnswerId);

public record SubmitQuizRequest(List<AnswerSubmissionDto> Answers);

public record QuizResultDto(int Score, int CorrectCount, int TotalQuestions);
public record UpsertQuestionDto(int ModuleId, string QuestionText, List<CreateAnswerOptionDto> Answers);

public record FetchQuestionDto(int questionId, int ModuleId, string QuestionText, List<CreateAnswerOptionDto> Answers);
public record CreateAnswerOptionDto(string AnswerText, bool IsCorrect);
