import { CloudstoveUiPage } from './app.po';

describe('cloudstove-ui App', function() {
  let page: CloudstoveUiPage;

  beforeEach(() => {
    page = new CloudstoveUiPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cloudstove-ui works!');
  });
});
