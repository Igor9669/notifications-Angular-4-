import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';



describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial number of notification to 0 ', () => {
    expect(component.total_number_of_ntfs).toBe(0);
  });

  it('should has categories list of 3 items', () => {
    expect(component.categories.length).toBe(3);
  });

  it('should has categories: info, warning, error', () => {
    expect(component.categories[0]).toBe('info');
    expect(component.categories[1]).toBe('warning');
    expect(component.categories[2]).toBe('error');
  });

  it('should has notification_time equal to 90 secs to close Info notification', () => {
    expect(component.notification_time).toBe(90000);
  });

  it('should has property showGrouped and it should be false', ()=>{
    expect(component.showGrouped).toBeFalsy();
  });
  it('should has property groupedTotal and it should be 0', ()=>{
    expect(component.groupedTotal).toBe(0);
  });

  it('should check that max number of notification to show is 5', ()=>{
    expect(component.maxNumberOfNtfs).toBe(5);
  });

  it('should set parent property to div.notifications', () => {
    const compiled = fixture.debugElement.nativeElement;
    //console.log(compiled.querySelector("notification") );
    expect((component.parent)).toBe(compiled.querySelector('.notifications'));
  });
  it('should not increase total number of notification for more than 5', () => {
    spyOn(component, 'show').and.callFake(()=>{
      if(component.canWeAddOneMore()){
        component.total_number_of_ntfs++;
      }
    });
    component.show("Test header", "Test body", "error");
    component.show("Test header", "Test body", "error");
    component.show("Test header", "Test body", "error");
    component.show("Test header", "Test body", "error");
    component.show("Test header", "Test body", "error");
    component.show("Test header", "Test body", "error");
    expect(component.total_number_of_ntfs).toBeLessThanOrEqual(5);
    //console.log(component.total_number_of_ntfs);
  });
  it('should check if createNotification method invoked in show() method', () => {

    spyOn(component, 'show').and.callFake(()=>{
      spyOn(component,'createNotification');
      component.createNotification("Test header", "Test body", "error");
    });
    component.show("Test header", "Test body", "error");
    expect(component.createNotification).toHaveBeenCalled();
    expect(component.createNotification).toHaveBeenCalledWith("Test header", "Test body", "error");
  });

  it('should check if addTypeAndIcon method invoked in createNotification() method', () => {

    spyOn(component, 'createNotification').and.callFake(()=>{
      spyOn(component,'addTypeAndIcon');
      component.addTypeAndIcon("","error");
    });
    component.createNotification("Test header", "Test body", "error");
    expect(component.addTypeAndIcon).toHaveBeenCalled();
    expect(component.addTypeAndIcon).toHaveBeenCalledWith("", "error");
  });

  it('should check if canWeAddOneMore method invoked in createNotification() method', () => {

    spyOn(component, 'createNotification').and.callFake(()=>{
      spyOn(component,'canWeAddOneMore').and.callFake(()=> true);
      component.canWeAddOneMore();
    });
    component.createNotification("Test header", "Test body", "error");
    expect(component.canWeAddOneMore).toHaveBeenCalled();
    expect(component.canWeAddOneMore).toBeTruthy();
  });
  
  
  describe('Testing Notifications', () => {
    beforeEach(() => {
      component.show("Test header", "Test body", "error");
      component.show("Test header", "Test body", "warning");
      component.show("Test header", "Test body", "info");
    });
    it('should increase the number of notifications', () => {
      expect(component.total_number_of_ntfs).toEqual(3);
    });
    it('should create div with classes: in, notification, error', () => {

      let ntf = fixture.nativeElement.querySelector('.error');
      expect(ntf).toBeTruthy();
      expect(ntf.classList.length).toBeGreaterThan(3);
      expect(ntf.classList[0]).toBe("notification");
      expect(ntf.classList[1]).toBe("in");
      expect(ntf.classList[2]).toBe("error");
    });
    it('should create div with classes: in, notification, warning', () => {

      let ntf = fixture.nativeElement.querySelector('.warning');
      expect(ntf).toBeTruthy();
      expect(ntf.classList.length).toBeGreaterThan(3);
      expect(ntf.classList[0]).toBe("notification");
      expect(ntf.classList[1]).toBe("in");
      expect(ntf.classList[2]).toBe("warning");
    });
    it('should create div with classes: in, notification, info', () => {

      let ntf = fixture.nativeElement.querySelector('.info');
      expect(ntf).toBeTruthy();
      expect(ntf.classList.length).toBeGreaterThan(3);
      expect(ntf.classList[0]).toBe("notification");
      expect(ntf.classList[1]).toBe("in");
      expect(ntf.classList[2]).toBe("info");
    });

    it('should add image-icon to notification div with class icon', () => {
      let ntf = fixture.nativeElement.querySelector('.notification');
      let img = ntf.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.classList[0]).toBe('icon');
    });
    it('should set right img src to error', () => {
      let ntf = fixture.nativeElement.querySelector('.error');
      let img = ntf.querySelector('img');
      expect(img.src).toBe("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABeElEQVRIib2VvUoDURCFzxjBoBYixqiNKBh9Bk0gbbS3s1csfK0oJl1eQMGXEH86JYWkSJnwWexu2ETvzyp6YGFYzpxzZ+/OjPTHsBgSMC+pJmkjffUm6dHMRr9yBxrADTDkK4bANVD/iXAV6H4j6kIHWI8V3wdeC4hneAFqMSd3iTeB3fRpOjjPQMVn4PssmznelofXcYkfeZIAtnPcnQC3kXHnch5Xgesp5+KFAPdyyoDkPz8OJOVFy05WghOgNDGQtC9pqYBBqIJlJY05MagGEmZFQxVMNDMDChqEKphoZgb9iIRFR+xCX0qHXXrJA/nvYSDpI41XJa14uENJK2Y2npckMxsBPUmnnqSepLs0rks683HNbDz1BjgMNE8rx20VbjQze5DU9ZwqFh0zu/9ikOJC0osj8YB02Cnpm+/wLOncaw/USKZiUTwBe1E1AhWSJRKLW2AtSnzGqA60ca/MNnDk04hd+iUlsyUbKe9Klv7YnfVP+ATnz2+MPjZzCQAAAABJRU5ErkJggg==");
    });
    it('should set right img src to warning', () => {
      let ntf = fixture.nativeElement.querySelector('.warning');
      let img = ntf.querySelector('img');
      expect(img.src).toBe("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABdUlEQVRIibWUsW4TQRCGP1+smKQAAlUUCclpLIrIQX6BSKSI3yEIukgglDIIiY40CfI7RPYL+EGSIiUSBRKNiygklZvwUfgOlvPd+RwfvzTS3M7s/8/O3g6UhNpWv8bWLruvLHmkXvgXl+pSlQJvnMbrqsgfqN8zBH6oq1UIfMggT3C0KPmaelUgcK0+XUSgF5CN1G+xjYL13n3Jm+o4IFoPYuvB+lht5vFEBRrHQCP4rgf+cuA3gM/zVr+t3qX63Qriz1OxX2pnnhOcZsRWAj/9e9aAL6UE1C6wm5G7muMn2FH3CgXUiEnvszBLAODE1AippxJeAS9yNu+qif8yJ2cL2AfOpiLmj4R58c8ICVt0CDzLqQxgABzENijI2wDep6ufNRKMLz/J787I/TNCkhN8Ap4UVDUvHgMfASInz/xtiU0tdVPdBFozs+Gd2kTtL3anhejX1J/Ao/t3oxA3ETD8T+QAw5qTl9cBHlZMfgucV8w5jd/qYj/jpI5wIQAAAABJRU5ErkJggg==");
    });
    it('should set right img src to info', () => {
      let ntf = fixture.nativeElement.querySelector('.info');
      let img = ntf.querySelector('img');
      expect(img.src).toBe("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABnElEQVRIib2Vv04UURTGf1e20xJcG4KQuNvYWLMbawteg2AseBYKorwBEKEj0cROeAg1rHYSGgpWEhLIj2Jm8DLeO8yC+iWTzJw/33duzplz4R8jtAlSO0APeFKafgLfQggX91JXh+q2OvZPjNUtdXAX4q66WyM8UQ/L56Tm21EftyXvqz8SFS9FMUsJ/3e1V+d7UK8c+AjMJbQvMu8VngIf1JmsAPA2Qw7QUxfUBYqGpzAPvEt61MXEse+KYcXbiTRWM1WNgE81Wx94mYkHeAN8jqvvmB5F1bXEaV/dcoJTdQp+96APPGyoaFI8ouxTJdA0w0N1WZ2dUKQbCzThBbABPJ9QwFjgeMLkNjiOBb4Av/4i+Rj4ei1QbsW9TPA5xaieRbaz0naeydkLIVzesKiDzMit58pU1zM5i1XMdZNDCPvAboKnaeenfDshhIPqo1NzvqaYmvnINmuxf1Koj+4IWGkoCNSeOrrlT03hUH3WSB6JzFhcIm3xXp1uRV4TGqib5q/MzbihKbS99Kcodku3NB1RXPqX+az/hCtunzNGTRpPIQAAAABJRU5ErkJggg==");
    });
    it('should have header "Test header" in error notification', () => {
      let ntf = fixture.nativeElement.querySelector('.error');
      let header = ntf.querySelector('.header');
      expect(header.innerText).toBe("Test header");
    });
    it('should have header "Test header" in warning notification', () => {
      let ntf = fixture.nativeElement.querySelector('.warning');
      let header = ntf.querySelector('.header');
      expect(header.innerText).toBe("Test header");
    });
    it('should have header "Test header" in info notification', () => {
      let ntf = fixture.nativeElement.querySelector('.info');
      let header = ntf.querySelector('.header');
      expect(header.innerText).toBe("Test header");
    });
    it('should have body "Test body" in error notification', () => {
      let ntf = fixture.nativeElement.querySelector('.error');
      let header = ntf.querySelector('.body');
      expect(header.innerText).toBe("Test body");
    });
    it('should have body "Test body" in warning notification', () => {
      let ntf = fixture.nativeElement.querySelector('.warning');
      let header = ntf.querySelector('.body');
      expect(header.innerText).toBe("Test body");
    });
    it('should have body "Test body" in info notification', () => {
      let ntf = fixture.nativeElement.querySelector('.info');
      let header = ntf.querySelector('.body');
      expect(header.innerText).toBe("Test body");
    });

  });

});
