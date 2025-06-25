// MongoDB initialization script
db = db.getSiblingDB('TodoAppDb');

// Create the todos collection
db.createCollection('Todos');

// Create indexes for better performance
db.Todos.createIndex({ "createdAt": -1 });
db.Todos.createIndex({ "isCompleted": 1 });
db.Todos.createIndex({ "priority": 1 });
db.Todos.createIndex({ "dueDate": 1 });

// Insert sample data (optional)
db.Todos.insertMany([
  {
    title: "Welcome to Todo App!",
    description: "This is your first todo item. You can edit, complete, or delete it.",
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    priority: "Medium"
  },
  {
    title: "Learn Docker",
    description: "Understand how to containerize applications with Docker",
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    priority: "High"
  }
]);

print('Database initialized successfully!');
