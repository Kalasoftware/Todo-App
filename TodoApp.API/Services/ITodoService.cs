using TodoApp.API.Models;

namespace TodoApp.API.Services
{
    public interface ITodoService
    {
        Task<List<Todo>> GetAllAsync();
        Task<Todo?> GetByIdAsync(string id);
        Task<Todo> CreateAsync(Todo todo);
        Task<bool> UpdateAsync(string id, Todo todo);
        Task<bool> DeleteAsync(string id);
    }
}
