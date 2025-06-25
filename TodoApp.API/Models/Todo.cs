using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoApp.API.Models
{
    public class Todo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("isCompleted")]
        public bool IsCompleted { get; set; } = false;

        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("dueDate")]
        public DateTime? DueDate { get; set; }

        [BsonElement("priority")]
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
    }
}
