import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodoService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo!: TodoInterface;
  @Input() isEdited!: boolean;

  @Output() setEditedId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('text') textInput?: ElementRef;

  public editedText: string = '';
  public todosService = inject(TodoService);

  public ngOnInit(): void {
    this.editedText = this.todo.text;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdited'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  public changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.editedText = value;
  }

  public changeTodo(): void {
    if (!this.editedText) {
      return;
    }
    this.todosService.changeTodo(this.todo.id, this.editedText);
    this.setEditedId.emit(null);
  }

  public setInEditMode(): void {
    this.setEditedId.emit(this.todo.id);
  }

  public removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  public toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
