# NotificationApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Notification component
To use notification component in your project you have to import it to your component and then place it somewhere in your html template:

`
...

<app-notification></app-notification>
...

`

### Notification methods
show(): `show(header_text: string, body_text: string, type_of_ntf: string)`

It takes 3 parameters: 

    - The header text

    - The body text

    - The type of notification ("error", "info", "warning");



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
