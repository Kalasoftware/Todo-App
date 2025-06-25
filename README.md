# ✨ Todo App - Stay Organized

A modern, feature-rich todo application built with ASP.NET Core Web API, React with TypeScript, and MongoDB. Features a beautiful dark theme and comprehensive task management capabilities.

## 🌟 Features

### ✅ Core Functionality
- **Create, read, update, and delete todos**
- **Mark todos as complete/incomplete**
- **Set priority levels** (Low, Medium, High) with visual indicators
- **Add due dates** with smart overdue detection
- **Rich descriptions** for detailed task information
- **Real-time updates** and responsive design

### 🎨 Modern UI/UX
- **🌙 Dark Theme Support** - Toggle between light and dark modes
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🎯 Smart Filtering** - Filter by status (All, Pending, Completed)
- **📊 Advanced Sorting** - Sort by date, priority, title, or due date
- **⚡ Smooth Animations** - Beautiful transitions and hover effects
- **🔍 Visual Status Indicators** - Clear priority badges and status icons

### 🚀 Enhanced Features
- **📅 Smart Date Formatting** - "Today", "Tomorrow", relative dates
- **⚠️ Overdue Detection** - Visual warnings for overdue tasks
- **⏰ Due Soon Alerts** - Notifications for upcoming deadlines
- **📈 Progress Tracking** - Visual progress indicators
- **🎯 Priority Management** - Color-coded priority system
- **💾 Auto-save Theme** - Remembers your theme preference
- **🌐 System Theme Detection** - Automatically detects OS theme preference

## 🛠 Tech Stack

### Backend
- **ASP.NET Core 9.0** - High-performance web API
- **MongoDB 7.0** - Document-based database
- **MongoDB.Driver** - Official .NET driver
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API calls
- **date-fns** - Modern date utility library
- **CSS Variables** - Dynamic theming system

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - High-performance web server
- **Multi-stage builds** - Optimized container images

## 📁 Project Structure

```
TodoApp/
├── 🔧 TodoApp.API/                 # ASP.NET Core Web API
│   ├── Controllers/TodosController.cs
│   ├── Models/Todo.cs
│   ├── Services/TodoService.cs & ITodoService.cs
│   ├── DTOs/CreateTodoDto.cs & UpdateTodoDto.cs
│   ├── Configuration/MongoDbSettings.cs
│   └── 🐳 Dockerfile
├── ⚛️ TodoApp.Client/              # React TypeScript App
│   ├── src/
│   │   ├── 🎨 components/          # React components
│   │   │   ├── TodoForm.tsx        # Smart expanding form
│   │   │   ├── TodoItem.tsx        # Enhanced todo item
│   │   │   ├── TodoList.tsx        # Advanced filtering & sorting
│   │   │   └── ThemeToggle.tsx     # Dark/light theme toggle
│   │   ├── 🔧 contexts/            # React contexts
│   │   │   └── ThemeContext.tsx    # Theme management
│   │   ├── 🌐 services/            # API services
│   │   │   └── todoService.ts      # HTTP client
│   │   ├── 📝 types/               # TypeScript types
│   │   │   └── Todo.ts             # Type definitions
│   │   ├── 🎨 styles/              # CSS styles
│   │   │   └── App.css             # Dark/light theme CSS
│   │   └── 🛠 utils/               # Utility functions
│   │       └── dateUtils.ts        # Date formatting utilities
│   ├── 🐳 Dockerfile & nginx.conf
│   └── 📱 Progressive Web App config
├── 🐳 docker-compose.yml           # Production setup
├── 🔧 docker-compose.dev.yml       # Development setup
├── 🗄️ init-mongo.js               # MongoDB initialization
├── 🚀 start.sh & stop.sh          # Helper scripts
└── 📚 README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- **Docker** and **Docker Compose**
- **.NET 9.0 SDK** (for local development)
- **Node.js 18+** (for local development)

### 🎯 Quick Start (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd TodoApp
   ```

2. **Start all services:**
   ```bash
   ./start.sh
   ```
   *Or manually:*
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - 🌐 **Frontend:** http://localhost:3000
   - 🔧 **API:** http://localhost:5000
   - 📚 **API Docs:** http://localhost:5000/swagger
   - 🗄️ **MongoDB:** localhost:27017

### 🔧 Development Setup

1. **Start MongoDB only:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Run the API:**
   ```bash
   cd TodoApp.API
   dotnet restore
   dotnet run
   ```

3. **Run the React app:**
   ```bash
   cd TodoApp.Client
   npm install
   npm run dev
   ```

## 🎨 Theme System

The app features a sophisticated dark/light theme system:

### 🌙 Dark Theme Features
- **Automatic Detection** - Respects system preference
- **Manual Toggle** - Easy theme switching
- **Persistent Storage** - Remembers your choice
- **Smooth Transitions** - Animated theme changes
- **Accessibility** - High contrast support
- **Mobile Optimized** - Perfect on all devices

### 🎨 CSS Architecture
- **CSS Variables** - Dynamic color system
- **Component-based** - Modular styling
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Minimal CSS bundle

## 📡 API Endpoints

| Method | Endpoint | Description | Features |
|--------|----------|-------------|----------|
| GET | `/api/todos` | Get all todos | ✅ Sorting, filtering |
| GET | `/api/todos/{id}` | Get todo by ID | ✅ Detailed view |
| POST | `/api/todos` | Create new todo | ✅ Validation, auto-timestamps |
| PUT | `/api/todos/{id}` | Update todo | ✅ Partial updates |
| DELETE | `/api/todos/{id}` | Delete todo | ✅ Soft delete option |
| PATCH | `/api/todos/{id}/toggle` | Toggle completion | ✅ Quick status change |

## ⚙️ Configuration

### 🔧 API Configuration
```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://admin:password123@mongodb:27017/TodoAppDb?authSource=admin",
    "DatabaseName": "TodoAppDb",
    "TodosCollectionName": "Todos"
  }
}
```

### 🗄️ MongoDB Configuration
- **Username:** `admin`
- **Password:** `password123`
- **Database:** `TodoAppDb`
- **Collection:** `Todos`

## 🐳 Docker Commands

```bash
# 🚀 Build and start all services
docker-compose up --build

# 🔄 Start services in background
docker-compose up -d

# 🛑 Stop all services
docker-compose down

# 📋 View logs
docker-compose logs -f

# 🔧 Rebuild specific service
docker-compose build client
docker-compose up -d client

# 🗑️ Remove all containers and volumes
docker-compose down -v

# 📊 Check container status
docker-compose ps
```

## 🎯 Usage Guide

### ✨ Creating Todos
1. **Quick Add** - Just type a title and press Enter
2. **Detailed Add** - Click in the title field to expand the form
3. **Set Priority** - Choose from Low (🟢), Medium (🟡), High (🔴)
4. **Add Due Date** - Set deadlines with smart validation
5. **Rich Descriptions** - Add detailed task information

### 🔍 Managing Todos
- **Filter by Status** - All, Pending, Completed
- **Sort Options** - Date, Priority, Title, Due Date
- **Quick Actions** - Complete, Edit, Delete
- **Visual Indicators** - Priority badges, status icons
- **Smart Dates** - "Today", "Tomorrow", relative formatting

### 🌙 Theme Features
- **Auto Theme** - Detects system preference
- **Manual Toggle** - Switch anytime with the toggle button
- **Persistent** - Remembers your choice across sessions
- **Smooth Transitions** - Beautiful animated changes

## 🚀 Production Deployment

### 🔒 Security Checklist
1. **Change default MongoDB credentials**
2. **Set secure environment variables**
3. **Configure proper CORS settings**
4. **Use HTTPS in production**
5. **Set up proper logging**
6. **Configure backup strategies**

### 🌐 Environment Setup
```bash
# Production environment variables
ASPNETCORE_ENVIRONMENT=Production
MongoDbSettings__ConnectionString=your-secure-connection-string
MongoDbSettings__DatabaseName=TodoAppProd
```

## 🔧 Development

### 🛠 Local Development
```bash
# API Development
cd TodoApp.API
dotnet watch run

# Frontend Development  
cd TodoApp.Client
npm run dev

# Database Management
docker exec -it todoapp-mongodb mongosh -u admin -p password123 --authenticationDatabase admin
```

### 🧪 Testing
```bash
# Test API endpoints
curl http://localhost:5000/api/todos

# Test theme persistence
localStorage.getItem('todo-app-theme')
```

## 🎨 Customization

### 🌈 Adding New Themes
1. Add theme colors to CSS variables
2. Update ThemeContext with new theme options
3. Modify theme toggle component
4. Test accessibility compliance

### 🔧 Extending Features
- **Categories/Tags** - Add todo categorization
- **Attachments** - File upload support  
- **Collaboration** - Multi-user support
- **Notifications** - Push notifications
- **Analytics** - Productivity insights

## 🐛 Troubleshooting

### Common Issues

1. **🔌 Port conflicts:**
   ```bash
   # Change ports in docker-compose.yml if needed
   ports:
     - "3001:80"  # Instead of 3000:80
   ```

2. **🗄️ MongoDB connection issues:**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Verify connection string format
   mongodb://username:password@host:port/database?authSource=admin
   ```

3. **🌐 CORS errors:**
   ```bash
   # Verify API URL in React app
   # Check CORS configuration in Program.cs
   ```

4. **🐳 Build failures:**
   ```bash
   # Clear Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

5. **🌙 Theme not persisting:**
   ```bash
   # Check localStorage in browser dev tools
   localStorage.getItem('todo-app-theme')
   ```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Submit a pull request**

### 📝 Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design
- Test both light and dark themes
- Ensure accessibility compliance
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **ASP.NET Core Team** - For the robust backend framework
- **MongoDB** - For the flexible database
- **Docker** - For containerization made easy
- **Vite** - For lightning-fast development
- **date-fns** - For excellent date utilities

---

**🎉 Happy Task Managing!** 

Built with ❤️ using modern web technologies. Perfect for personal productivity, team collaboration, or learning full-stack development.

**⭐ Star this repo if you found it helpful!**
