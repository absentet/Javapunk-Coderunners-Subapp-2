using Javapunk_Coderunners_Subapp_2.Server.Data;
using Javapunk_Coderunners_Subapp_2.Server.Repositories;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Javapunk_Coderunners_Subapp_2.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IModuleRepository, ModuleRepository>();
builder.Services.AddScoped<IQuizService, QuizService>();


// Add database context
builder.Services.AddDbContext<QuizDbContext>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
