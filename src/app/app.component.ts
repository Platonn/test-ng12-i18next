import { Component, Inject } from '@angular/core';
import { i18n } from 'i18next';
import { I18NEXT_INSTANCE } from './i18next-instance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'test-ng12-i18next';
  // ctor I18NEXT_INSTANCE
  constructor(@Inject(I18NEXT_INSTANCE) public i18next: i18n) {}
}
