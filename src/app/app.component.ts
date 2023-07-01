import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {APIService, ListTodosQuery, Todo} from "./API.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(APIService);

  protected todos: NonNullable<ListTodosQuery['items'][number]>[] = [];

  protected form = this.fb.group({
    title: this.fb.control('', {nonNullable: true, validators: [Validators.required]})
  })

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

  protected async setIsCompleted(id: string, value: boolean, index: number): Promise<void> {
    const todo = await this.api.UpdateTodo({id, isCompleted: value});
    this.todos[index] = todo;
  }

  protected markAllAsComplete(): void {
    console.log('marking all as complete...')
  }

  protected deleteAllCompleted(): void {
    console.log('deleting all completed...')
  }

  protected trackBy(index: number, todo: Todo) {
    return todo.id
  }
}
