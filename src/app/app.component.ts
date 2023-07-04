import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {APIService, ListTodosQuery, Todo} from "./API.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  protected todos: NonNullable<ListTodosQuery['items'][number]>[] = [];
  private fb = inject(FormBuilder);
  protected form = this.fb.group({
    title: this.fb.control('', {nonNullable: true, validators: [Validators.required]})
  })
  private api = inject(APIService);

  async ngOnInit(): Promise<void> {
    this.todos = (await this.api.ListTodos()).items
      .filter(todo => !!todo)
      .map(todo => todo!);
  }

  protected async createTodo(): Promise<void> {
    const todo = await this.api.CreateTodo(this.form.getRawValue());
    this.todos.push(todo);
    this.form.reset();
  }

  protected async toggleIsCompleted(index: number): Promise<void> {
    const {id} = this.todos[index];
    const todo = await this.api.ToggleIsCompleted(id);

    this.todos[index] = todo;
  }

  protected async markAllAsComplete(): Promise<void> {
    await this.api.MarkAllAsComplete();

    this.todos = this.todos.map(todo => ({
      ...todo,
      isCompleted: true,
    }));
  }

  protected async deleteAllCompleted(): Promise<void> {
    await this.api.DeleteAllCompleted();

    this.todos = this.todos.filter(todo => !todo.isCompleted);
  }

  protected trackBy(index: number, todo: Todo) {
    return `${todo.id}${todo.isCompleted}`;
  }
}
