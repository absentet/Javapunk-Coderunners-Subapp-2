using Javapunk_Coderunners_Subapp_2.Server.Data;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Javapunk_Coderunners_Subapp_2.Server.Repositories;

public class UserRepository : IUserRepository
{
    private readonly QuizDbContext _context;

    public UserRepository(QuizDbContext context)
    {
        _context = context;
    }

    public async Task<Users?> GetByUsernameAsync(string username)
    {
        return await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.User_name == username);
    }

    public async Task<Users?> GetByIdAsync(int userId)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == userId);
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await _context.Users
            .AnyAsync(u => u.User_name == username);
    }

    public async Task AddAsync(Users user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}