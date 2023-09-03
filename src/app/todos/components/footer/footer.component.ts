import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { TodoService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  public todosService = inject(TodoService);
  public filterSignal = this.todosService.filterSignal;
  public filterEnum = FilterEnum;
  public activeCount = computed(() => {
    return this.todosService.todosSignal().filter((todo) => !todo.isCompleted)
      .length;
  });
  public noTodosClass = computed(
    () => this.todosService.todosSignal().length === 0
  );
  public itemsLeftText = computed(() => `item${this.pluralCondition()} left`);

  public changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filterName);
  }

  private pluralCondition(): string {
    return this.activeCount() !== 1 ? 's' : '';
  }
}
