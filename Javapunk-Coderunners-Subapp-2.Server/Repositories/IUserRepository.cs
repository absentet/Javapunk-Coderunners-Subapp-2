using Javapunk_Coderunners_Subapp_2.Server.Models;

namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;

// Data access for users
public interface IUserRepository
{
    Task<Users?> GetByUsernameAsync(string username);
    Task<Users?> GetByIdAsync(int userId);

    Task<bool> UsernameExistsAsync(string username);
    Task AddAsync(Users user);
    Task SaveChangesAsync();
}