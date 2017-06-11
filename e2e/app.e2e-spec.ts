import { NotificationAppPage } from './app.po';

describe('notification-app App', () => {
  let page: NotificationAppPage;

  beforeEach(() => {
    page = new NotificationAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
