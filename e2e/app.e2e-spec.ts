import { Wlq2Page } from './app.po';

describe('wlq2 App', () => {
  let page: Wlq2Page;

  beforeEach(() => {
    page = new Wlq2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
