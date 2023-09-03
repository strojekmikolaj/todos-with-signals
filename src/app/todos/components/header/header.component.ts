import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  public text: string = '';

  private todosService = inject(TodoService);

  public changeText(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.text = target.value;
  }

  public addTodo(): void {
    if (!this.text) {
      return;
    }
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
