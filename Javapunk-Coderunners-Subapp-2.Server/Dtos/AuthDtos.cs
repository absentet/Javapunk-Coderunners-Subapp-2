namespace Javapunk_Coderunners_Subapp_2.Server.Dtos;

public record RegisterRequest(string Username, string Password);

public record LoginRequest(string Username, string Password);

public record AuthResponse(string Token, int UserId, string Username);