using Javapunk_Coderunners_Subapp_2.Server.Dtos;
using Javapunk_Coderunners_Subapp_2.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Javapunk_Coderunners_Subapp_2.Server.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class QnACRUDController : ControllerBase
{
    private readonly IQnACRUDService _qnACRUDService;

    public QnACRUDController(IQnACRUDService qnACRUDService)
    {
        _qnACRUDService = qnACRUDService;
    }

    // POST api/qnacrud/create
    [HttpPost("create")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> CreateQuestion(UpsertQuestionDto question)
    {
        await _qnACRUDService.CreateQuestionAsync(question);
        return Ok();
    }

    // PUT api/qnacrud/update
    [HttpPut("update")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> UpdateQuestion(UpsertQuestionDto question, int questionId)
    {
        await _qnACRUDService.UpdateQuestionAsync(question, questionId);
        return Ok();
    }

    // DELETE api/qnacrud/delete
    [HttpDelete("delete")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> DeleteQuestion(int questionId)
    {
        await _qnACRUDService.DeleteQuestionAsync(questionId);
        return Ok();
    }

    // GET api/qnacrud/getall
    [HttpGet("getall")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> GetAllQuestions()
    {
        var questions = await _qnACRUDService.GetAllQuestionsAsync();
        return Ok(questions);
    }

    // GET api/qnacrud/getwithid/{questionId}
    [HttpGet("getwithid/{questionId}")]
    // TODO: Remove when auth is in place
    [AllowAnonymous]
    public async Task<IActionResult> GetQuestionWithId(int questionId)
    {
        var question = await _qnACRUDService.GetQuestionWithId(questionId);
        return Ok(question);
    }
}
