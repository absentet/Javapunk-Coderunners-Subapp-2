using Microsoft.EntityFrameworkCore;
using Javapunk_Coderunners_Subapp_2.Server.Models;
using Microsoft.Data.Sqlite;

namespace Javapunk_Coderunners_Subapp_2.Server.Data;

public class QuizDbContext : DbContext
{
    public DbSet<Users> Users { get; set; }
    public DbSet<Modules> Modules { get; set; }
    public DbSet<Questions> Questions { get; set; }
    public DbSet<Answers> Answers { get; set; }
    public DbSet<Completed_modules> Completed_modules { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "database.db" };
        var connectionString = connectionStringBuilder.ToString();
        var connection = new SqliteConnection(connectionString);

        optionsBuilder.UseSqlite(connection);
    }
}
