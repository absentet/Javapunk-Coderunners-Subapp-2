using Javapunk_Coderunners_Subapp_2.Server.Models;

namespace Javapunk_Coderunners_Subapp_2.Server.Services;

// Creates the login token that the client sends with every request.
public interface ITokenService
{
    string CreateToken(Users user);
}