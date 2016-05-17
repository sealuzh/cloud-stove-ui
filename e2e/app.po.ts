export class CloudstoveUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('cloudstove-ui-app h1')).getText();
  }
}
