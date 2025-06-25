using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TodoApp.API.Configuration;
using TodoApp.API.Models;

namespace TodoApp.API.Services
{
    public class TodoService : ITodoService
    {
        private readonly IMongoCollection<Todo> _todosCollection;

        public TodoService(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _todosCollection = mongoDatabase.GetCollection<Todo>(mongoDbSettings.Value.TodosCollectionName);
        }

        public async Task<List<Todo>> GetAllAsync()
        {
            return await _todosCollection
                .Find(_ => true)
                .SortByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task<Todo?> GetByIdAsync(string id)
        {
            return await _todosCollection
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Todo> CreateAsync(Todo todo)
        {
            await _todosCollection.InsertOneAsync(todo);
            return todo;
        }

        public async Task<bool> UpdateAsync(string id, Todo todo)
        {
            todo.UpdatedAt = DateTime.UtcNow;
            var result = await _todosCollection
                .ReplaceOneAsync(x => x.Id == id, todo);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var result = await _todosCollection
                .DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }
    }
}
