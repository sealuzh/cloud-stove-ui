import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('The Cloud Stove');
  });

  it('should have a header', () => {
    expect(element(by.css('.dashhead-title')).isPresent()).toEqual(true);
    expect(element(by.css('.dashhead-title')).getText()).toEqual('Cloudstove Dashboard');
  });

  it('should have <cs-app>', () => {
    expect(element(by.css('cs-app')).isPresent()).toEqual(true);
  });

});
