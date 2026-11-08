using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Javapunk_Coderunners_Subapp_2.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    private readonly IQuizService _quizService;

    public QuizController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    // GET api/quiz/modules
    [HttpGet("modules")]
    public async Task<ActionResult<List<ModuleDto>>> GetModules()
    {
        return Ok(await _quizService.GetModulesAsync());
    }

    // GET api/quiz/modules/1/questions
    [HttpGet("modules/{moduleId:int}/questions")]
    public async Task<ActionResult<List<QuestionDto>>> GetQuestionsForModule(int moduleId)
    {
        var questions = await _quizService.GetQuestionsForModuleAsync(moduleId);

        if (questions.Count == 0)
        {
            return NotFound($"No questions found for module {moduleId}.");
        }

        return Ok(questions);
    }

    // GET api/quiz/exam
    [HttpGet("exam")]
    public async Task<ActionResult<List<QuestionDto>>> GetExamQuestions()
    {
        var questions = await _quizService.GetExamQuestionsAsync();

        if (questions.Count == 0)
        {
            return NotFound("No questions are available for the exam.");
        }

        return Ok(questions);
    }

    // POST api/quiz/check
    [HttpPost("check")]
    public async Task<ActionResult<CheckAnswerResponse>> CheckAnswer(CheckAnswerRequest request)
    {
        bool isCorrect = await _quizService.CheckAnswerAsync(request.QuestionId, request.AnswerId);

        int? correctAnswerId = await _quizService.GetCorrectAnswerIdAsync(request.QuestionId);

        return Ok(new CheckAnswerResponse(isCorrect, correctAnswerId));
    }

    // POST api/quiz/submit
    [HttpPost("submit")]
    public async Task<ActionResult<QuizResultDto>> Submit(SubmitQuizRequest request)
    {
        if (request.Answers == null || request.Answers.Count == 0)
        {
            return BadRequest("No answers were submitted.");
        }

        var result = await _quizService.SubmitQuizAsync(request.Answers);

        return Ok(result);
    }
}