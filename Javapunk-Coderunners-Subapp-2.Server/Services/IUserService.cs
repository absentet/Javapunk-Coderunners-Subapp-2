using Javapunk_Coderunners_Subapp_2.Server.Models;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;
public interface IUserService
{
    // Returns null if the username/password are invalid or the username is taken.
    Task<Users?> CreateUserAsync(string username, string password);

    Task<Users?> GetUserWithUserNameAsync(string username);

    // Returns the user if the username and password are correct, otherwise null.
    Task<Users?> LoginAsync(string username, string password);

    // Returns false if the user does not exist or the score could not be saved.
    Task<bool> AddScoreToUserScoreAsync(int userId, int score);
}