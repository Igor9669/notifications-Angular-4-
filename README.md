# NotificationApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Setup
Open the directory where you have placed the project and install all required modules:

    npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). Windows users may need to run terminal as Administrator.

## Notification component
To use notification component in your project you have to import it to your component and then place it in your html template:
    
    ...

    <app-notification></app-notification>

    ...

### Notification methods
show: 

    show(header_text: string, body_text: string, type_of_ntf: string) {
        
        ...

    }

It takes 3 parameters: 

    - The header text

    - The body text

    - The type of notification ("error", "info", "warning");

Use it to show notification in your app.


createNotification: 

    createNotification(header_text: string, body_text: string, type_of_ntf: string) {
        
        ...

    }

Here we dynamically create html for our new notification. To add, create html on the fly we are using [Renderer2](https://angular.io/api/core/Renderer2) class.

We also subscribe to necessary events that will invoke at some point in our notification, like onclick when we will click on notification and animationend when animation for particular notification will finished.

Also we checking the total number of current notifications. And if there are more than 5 notifications than we start grouping oldest ones.

createGroup:

    createGroup() {
        
        ...

    }

Is very similar to createNotification, except that we dont need any parameters here.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
