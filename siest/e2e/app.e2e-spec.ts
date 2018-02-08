import { SiestAngular } from './app.po';

describe('siest-angular App', () => {
  let page: SiestAngular;

  beforeEach(() => {
    page = new SiestAngular();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
