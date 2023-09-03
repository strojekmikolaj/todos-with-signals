import { Component, inject, computed } from '@angular/core';
import { TodoService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, TodoComponent],
})
export class MainComponent {
  public todoService = inject(TodoService);
  public editedTodoId: string | null = null;
  public visibleTodos = computed(() => {
    const todos = this.todoService.todosSignal();
    const filter = this.todoService.filterSignal();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  });
  public isAllTodosSelected = computed(() =>
    this.todoService.todosSignal().every((todo) => todo.isCompleted)
  );

  public setEditedId(editedTodoId: string | null): void {
    this.editedTodoId = editedTodoId;
  }

  public toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todoService.toggleAll(target.checked);
  }
}
