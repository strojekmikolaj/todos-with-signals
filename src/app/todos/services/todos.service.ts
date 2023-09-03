import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todosSignal = signal<TodoInterface[]>([]);
  public filterSignal = signal<FilterEnum>(FilterEnum.all);

  public addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  public changeFilter(filterName: FilterEnum): void {
    this.filterSignal.set(filterName);
  }

  public changeTodo(id: string, text: string): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  public removeTodo(id: string): void {
    this.todosSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  public toggleTodo(id: string): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  public toggleAll(isCompleted: boolean): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) => ({ ...todo, isCompleted }))
    );
  }
}
