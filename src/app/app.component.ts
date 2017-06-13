import { Component, ViewChild, Input } from '@angular/core';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(NotificationComponent)
  notificationComponent: NotificationComponent;


  header = "";
  body = "";
  type_of_notification = "info";

  title = 'Test notifications';

  showNotification() {
    this.notificationComponent.show(this.header, this.body, this.type_of_notification);
  }
}
