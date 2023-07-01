import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    title: this.fb.control('', {nonNullable: true, validators: [Validators.required]})
  })

  protected createTodo(): void {
    console.log('creating todo...');
    this.form.reset();
  }

  protected setCompleted(value: boolean): void {
    console.log(`setting completed to ${value}...`);
  }

  protected markAllAsComplete(): void {
    console.log('marking all as complete...')
  }

  protected deleteAllCompleted(): void {
    console.log('deleting all completed...')
  }
}
