import { APP_INITIALIZER, NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'zone.js/plugins/task-tracking';
import { AppComponent } from './app.component';
import { i18nextInit } from './i18next-init';
import { I18NEXT_INSTANCE } from './i18next-instance';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: i18nextInit,
      deps: [I18NEXT_INSTANCE],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(ngZone: NgZone) {
    /**
     * CONFIGURE how long to wait (in seconds)
     * before the pending tasks are dumped to the console.
     */
    const WAIT_SECONDS = 2;

    console.log(
      `⏳ ... Wait ${WAIT_SECONDS} seconds to dump pending tasks ... ⏳`
    );

    // run the debugging `setTimeout` code outside of
    // the Angular Zone, so it's not considered as
    // another Pending Zone Task:
    ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // get the task-tracking object from NgZone's internals:
        const TaskTrackingZone = (ngZone as any)._inner._parent._properties
          .TaskTrackingZone;

        // list all pending tasks (micro tasks,
        // macro tasks and event listeners):
        console.debug('👀 Pending tasks in NgZone: 👀');
        console.debug({
          microTasks: TaskTrackingZone.getTasksFor('microTask'),
          macroTasks: TaskTrackingZone.getTasksFor('macroTask'),
          eventTasks: TaskTrackingZone.getTasksFor('eventTask'),
        });
        console.debug(
          `👀 For every pending Zone task listed above investigate the stacktrace in the property 'creationLocation' 👆`
        );
      }, 1000 * WAIT_SECONDS);
    });
  }
}
