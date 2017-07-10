import { MyPlacesPage } from './app.po';

describe('my-places App', () => {
  let page: MyPlacesPage;

  beforeEach(() => {
    page = new MyPlacesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
