using Microsoft.AspNetCore.Mvc;
using TodoApp.API.DTOs;
using TodoApp.API.Models;
using TodoApp.API.Services;

namespace TodoApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodosController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetTodos()
        {
            var todos = await _todoService.GetAllAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(string id)
        {
            var todo = await _todoService.GetByIdAsync(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(CreateTodoDto createTodoDto)
        {
            var todo = new Todo
            {
                Title = createTodoDto.Title,
                Description = createTodoDto.Description,
                DueDate = createTodoDto.DueDate,
                Priority = createTodoDto.Priority
            };

            var createdTodo = await _todoService.CreateAsync(todo);
            return CreatedAtAction(nameof(GetTodo), new { id = createdTodo.Id }, createdTodo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(string id, UpdateTodoDto updateTodoDto)
        {
            var existingTodo = await _todoService.GetByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            // Update only provided fields
            if (!string.IsNullOrEmpty(updateTodoDto.Title))
                existingTodo.Title = updateTodoDto.Title;
            
            if (updateTodoDto.Description != null)
                existingTodo.Description = updateTodoDto.Description;
            
            if (updateTodoDto.IsCompleted.HasValue)
                existingTodo.IsCompleted = updateTodoDto.IsCompleted.Value;
            
            if (updateTodoDto.DueDate.HasValue)
                existingTodo.DueDate = updateTodoDto.DueDate;
            
            if (!string.IsNullOrEmpty(updateTodoDto.Priority))
                existingTodo.Priority = updateTodoDto.Priority;

            var updated = await _todoService.UpdateAsync(id, existingTodo);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(string id)
        {
            var deleted = await _todoService.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> ToggleTodo(string id)
        {
            var existingTodo = await _todoService.GetByIdAsync(id);
            if (existingTodo == null)
            {
                return NotFound();
            }

            existingTodo.IsCompleted = !existingTodo.IsCompleted;
            var updated = await _todoService.UpdateAsync(id, existingTodo);
            
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
