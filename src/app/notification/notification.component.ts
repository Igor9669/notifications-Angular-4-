import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit {

  parent: any;
  total_number_of_ntfs: number;
  categories = ['info', 'warning', 'error'];
  notification_time = 90000;
  showGrouped = false;
  groupedTotal = 0;
  maxNumberOfNtfs = 5;

  constructor(private renderer: Renderer2) {
    this.total_number_of_ntfs = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.parent = this.renderer.selectRootElement(".notifications");
    // console.log(this.parent);
  }

  show(header_text: string, body_text: string, type_of_ntf: string) {
    this.createNotification(header_text, body_text, type_of_ntf);
  }

  createNotification(header_text: string, body_text: string, type_of_ntf: string) {
    if (this.total_number_of_ntfs === this.maxNumberOfNtfs) {
      if (!this.showGrouped) {
        this.showGrouped = true;
        this.groupedTotal += 2;
        this.renderer.removeChild(this.parent, this.parent.querySelector('.notification'));
        this.createGroup();
      } else {
        this.groupedTotal++;
      }
      this.renderer.removeChild(this.parent, this.parent.querySelector('.notification'));
      this.total_number_of_ntfs--;
      this.updateCounter();

    }

    if (!this.canWeAddOneMore()) {
      return;
    }

    this.total_number_of_ntfs++;
    //console.log(this.total_number_of_ntfs);

    let notification = this.renderer.createElement("div");
    this.renderer.addClass(notification, "notification");
    this.renderer.addClass(notification, "in");

    this.addListeners(notification, type_of_ntf);
    this.addTypeAndIcon(notification, type_of_ntf);

    let header = this.renderer.createElement("div");
    this.renderer.appendChild(header, this.renderer.createText(header_text));
    this.renderer.addClass(header, "header");
    this.renderer.appendChild(notification, header);

    let body = this.renderer.createElement("div");
    this.renderer.appendChild(body, this.renderer.createText(body_text));
    this.renderer.addClass(body, "body");
    this.renderer.appendChild(notification, body);

    this.renderer.appendChild(this.parent, notification);
    this.renderer.addClass(notification, type_of_ntf + "AnimIn");


    //return notification;
  }

  addListeners(notification: any, type_of_ntf: string) {
    this.renderer.listen(notification, "click", () => {
      // console.log("clicked!");
      this.clickHandler(notification, type_of_ntf);
    });
    this.renderer.listen(notification, "animationend", (e) => {
      this.animationendHandler(notification, type_of_ntf, e);
    });
    this.renderer.listen(notification, "webkitAnimationEnd", (e) => {
      this.animationendHandler(notification, type_of_ntf, e);
    });
  }

  addTypeAndIcon(notification: any, type_of_ntf: string) {
    let image = this.renderer.createElement("img");

    switch (type_of_ntf) {
      case "error":
        this.renderer.addClass(notification, "error");
        this.renderer.setAttribute(image, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABeElEQVRIib2VvUoDURCFzxjBoBYixqiNKBh9Bk0gbbS3s1csfK0oJl1eQMGXEH86JYWkSJnwWexu2ETvzyp6YGFYzpxzZ+/OjPTHsBgSMC+pJmkjffUm6dHMRr9yBxrADTDkK4bANVD/iXAV6H4j6kIHWI8V3wdeC4hneAFqMSd3iTeB3fRpOjjPQMVn4PssmznelofXcYkfeZIAtnPcnQC3kXHnch5Xgesp5+KFAPdyyoDkPz8OJOVFy05WghOgNDGQtC9pqYBBqIJlJY05MagGEmZFQxVMNDMDChqEKphoZgb9iIRFR+xCX0qHXXrJA/nvYSDpI41XJa14uENJK2Y2npckMxsBPUmnnqSepLs0rks683HNbDz1BjgMNE8rx20VbjQze5DU9ZwqFh0zu/9ikOJC0osj8YB02Cnpm+/wLOncaw/USKZiUTwBe1E1AhWSJRKLW2AtSnzGqA60ca/MNnDk04hd+iUlsyUbKe9Klv7YnfVP+ATnz2+MPjZzCQAAAABJRU5ErkJggg==");
        break;
      case "warning":
        this.renderer.setAttribute(image, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABdUlEQVRIibWUsW4TQRCGP1+smKQAAlUUCclpLIrIQX6BSKSI3yEIukgglDIIiY40CfI7RPYL+EGSIiUSBRKNiygklZvwUfgOlvPd+RwfvzTS3M7s/8/O3g6UhNpWv8bWLruvLHmkXvgXl+pSlQJvnMbrqsgfqN8zBH6oq1UIfMggT3C0KPmaelUgcK0+XUSgF5CN1G+xjYL13n3Jm+o4IFoPYuvB+lht5vFEBRrHQCP4rgf+cuA3gM/zVr+t3qX63Qriz1OxX2pnnhOcZsRWAj/9e9aAL6UE1C6wm5G7muMn2FH3CgXUiEnvszBLAODE1AippxJeAS9yNu+qif8yJ2cL2AfOpiLmj4R58c8ICVt0CDzLqQxgABzENijI2wDep6ufNRKMLz/J787I/TNCkhN8Ap4UVDUvHgMfASInz/xtiU0tdVPdBFozs+Gd2kTtL3anhejX1J/Ao/t3oxA3ETD8T+QAw5qTl9cBHlZMfgucV8w5jd/qYj/jpI5wIQAAAABJRU5ErkJggg==");
        this.renderer.addClass(notification, "warning");
        break;
      case "info":
        this.renderer.addClass(notification, "info");
        this.renderer.setAttribute(image, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABnElEQVRIib2Vv04UURTGf1e20xJcG4KQuNvYWLMbawteg2AseBYKorwBEKEj0cROeAg1rHYSGgpWEhLIj2Jm8DLeO8yC+iWTzJw/33duzplz4R8jtAlSO0APeFKafgLfQggX91JXh+q2OvZPjNUtdXAX4q66WyM8UQ/L56Tm21EftyXvqz8SFS9FMUsJ/3e1V+d7UK8c+AjMJbQvMu8VngIf1JmsAPA2Qw7QUxfUBYqGpzAPvEt61MXEse+KYcXbiTRWM1WNgE81Wx94mYkHeAN8jqvvmB5F1bXEaV/dcoJTdQp+96APPGyoaFI8ouxTJdA0w0N1WZ2dUKQbCzThBbABPJ9QwFjgeMLkNjiOBb4Av/4i+Rj4ei1QbsW9TPA5xaieRbaz0naeydkLIVzesKiDzMit58pU1zM5i1XMdZNDCPvAboKnaeenfDshhIPqo1NzvqaYmvnINmuxf1Koj+4IWGkoCNSeOrrlT03hUH3WSB6JzFhcIm3xXp1uRV4TGqib5q/MzbihKbS99Kcodku3NB1RXPqX+az/hCtunzNGTRpPIQAAAABJRU5ErkJggg==");
        break;
      default:
        break;
    }
    this.renderer.addClass(image, "icon");
    this.renderer.appendChild(notification, image);
  }

  clickHandler(notification: any, type_of_ntf: string) {
    this.renderer.removeClass(notification, "in");
    this.renderer.addClass(notification, type_of_ntf + "AnimOut");

  }

  animationendHandler(notification: any, type_of_ntf: string, e: any) {
    //console.log(e.target.classList);
    if (e.target.classList.contains('in')) {
      this.renderer.setStyle(notification, "opacity", "1");
      if (type_of_ntf === "info") {
        setTimeout(function () {
          this.clickHandler(notification, type_of_ntf)
        }.bind(this), this.notification_time);
      }

    } else {
      this.renderer.removeChild(this.parent, notification);
      this.total_number_of_ntfs--;
    }

  }

  canWeAddOneMore() {
    return this.total_number_of_ntfs < 5;
  }

  createGroup() {
    let group = this.renderer.createElement("div");
    this.renderer.addClass(group, "notification-group");
    this.renderer.addClass(group, "in");

    let header = this.renderer.createElement("div");
    this.renderer.appendChild(header, this.renderer.createText("Notifications"));
    this.renderer.addClass(header, "header");
    this.renderer.appendChild(group, header);

    let body = this.renderer.createElement("div");
    this.renderer.addClass(body, "body");
    this.renderer.addClass(body, "counter");
    this.renderer.appendChild(group, body);

    let image = this.renderer.createElement("img");
    this.renderer.addClass(group, "info");
        this.renderer.setAttribute(image, "src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABXElEQVRIia2VvUoDQRSFzw3BBEUTIvZq/Gn1ATT4BCnEysInEPMi9lra+AxKKk2RN1CENILYWAgRVET4LLKLcXfW7Ez2g23uzDlnZu4wK+UEaAD3wB3QyKvLDdDml3ZRpmWgAwxIMwBOgHKoeR3oOYyT3AJ1X3MDrnOYx1wB5hNw4GEes+/yKmVkHHpt+R9NVsB6QMCGT8BSQIBTk2pM1KwvSb7X71vSjJkxXnTtoB5grkhTSxZdASsB5jGreQJ2pwjYyROQmuRBanF/mgwsSnqUNBcY8C5p2cxe4kJyB50pzCVpVtKxcwRoAsOAJyLJEGgmzatAvwDzmD5Qjc0rQLdA85guUClFfdie4tyz2JJkZTP7APYkHUmad0zcjOprkhYSYzeSHhyaN0kXZvY5cRlAi9Hv8dJxDK1J+qzXdJyepCeNru+ppNex1fdy6CcD1IBz4Dn6zoDUw+biB36mKziRxOhmAAAAAElFTkSuQmCC");

    
    this.renderer.addClass(image, "icon");
    this.renderer.appendChild(group, image);

    this.renderer.insertBefore(this.parent, group, this.parent.querySelector('.notification'));
  }
  updateCounter(){
    let counter = this.renderer.selectRootElement(".counter");
    counter.innerText = this.groupedTotal + " more";
  }

}
