using Javapunk_Coderunners_Subapp_2.Server.Models;
using Javapunk_Coderunners_Subapp_2.Server.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;

//Registration, login and score handeling for users
//Access to database goes through the IUserRepository
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;
    private readonly PasswordHasher<Users> _passwordHasher = new();

    public UserService(IUserRepository userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    //This creates a new user and returns null if imput is invalid, the username is already taken,
    //or if saving fails (controller then answers with a fitting error message)
    public async Task<Users?> CreateUserAsync(string username, string password)
    {
        //Validation for server-side
        if (string.IsNullOrWhiteSpace(username) || username.Length < 3 || username.Length > 20)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            return null;
        }

        try
        {
            if (await _userRepository.UsernameExistsAsync(username))
            {
                return null;
            }

            //Only hash is saved in the database, not the real password
            Users user = new Users();
            user.User_name = username;
            user.User_score = 0;
            user.User_password = _passwordHasher.HashPassword(user, password);

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return user;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to create user {Username}", username);
            return null;
        }
    }

    public async Task<Users?> GetUserWithUserNameAsync(string username)
    {
        try
        {
            return await _userRepository.GetByUsernameAsync(username);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to look up user {Username}", username);
            return null;
        }
    }

    //this returns the user if username and password are both correct. 
    //If they are not(both have to be correct), it returns null
    public async Task<Users?> LoginAsync(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            return null;
        }

        try
        {
            Users? user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
            {
                return null;
            }

            //Comparing the submitted password to the one stored as hash

            var result = _passwordHasher.VerifyHashedPassword(user, user.User_password, password);

            return result == PasswordVerificationResult.Failed ? null : user;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to log in user {Username}", username);
            return null;
        }
    }

    
    public async Task<bool> AddScoreToUserScoreAsync(int userId, int score)
    {
        try
        {
            Users? user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                _logger.LogWarning("Could not add score: no user with id {UserId}", userId);
                return false;
            }

            user.User_score += score;

            await _userRepository.SaveChangesAsync();

            return true;
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Failed to add score to user {UserId}", userId);
            return false;
        }
    }
}