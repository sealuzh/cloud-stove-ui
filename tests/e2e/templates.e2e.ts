import { protractor, browser, by, element } from 'protractor';

describe('/templates', () => {

  beforeEach(() => {
    browser.get('/templates');
    
    // clear local storage
    browser.executeScript('window.localStorage.clear();');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('The Cloud Stove');
  });

  it('should have a header', () => {
    expect(element(by.css('.dashhead-title')).isPresent()).toEqual(true);
    expect(element(by.css('.dashhead-title')).getText()).toEqual('Templates');
  });

  it('should display templates after loading', () => {
    // wait until loading is finished
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css('.jumbotron'))), 5000);
    expect(element(by.css('.jumbotron')).isPresent()).toEqual(true);
  });

});
