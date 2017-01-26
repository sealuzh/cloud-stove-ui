import { protractor, browser, by, element } from 'protractor';
import { LoginHelper } from './helper/loginHelper';

let countOfElementsToBeGreaterThan = function(elms, expectedValue) {
  return elms.count().then(function (actualValue) {
      return expectedValue >= actualValue;
  });
};

describe('/applications', () => {

  let loginHelper = new LoginHelper(browser);

  beforeAll((done) => {
    browser.get('/');
    loginHelper.login(done);
  });

  beforeEach(() => {
    browser.get('/applications');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('The Cloud Stove');
  });

  it('should have a header', () => {
    expect(element(by.css('.dashhead-title')).isPresent()).toEqual(true);
    expect(element(by.css('.dashhead-title')).getText()).toEqual('Applications');
  });

  it('should display applications after loading', () => {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css('.table'))), 5000);
    expect(element(by.css('.table')).isPresent()).toEqual(true);
  });

  it('should successfully copy an application, and delete it afterwards', () => {
    browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css('.table'))), 5000);

    // count available applications
    let applications = element.all(by.css('tbody > tr'));
    browser.wait(countOfElementsToBeGreaterThan(applications, 1), 5000);

    applications.count().then((count) => {
      expect(applications.count()).toEqual(count);

      applications.first().element(by.css('.fa-copy')).click();
      browser.wait(countOfElementsToBeGreaterThan(applications, count), 5000);

      expect(applications.count()).toEqual(count + 1);

      applications.last().element(by.css('.fa-trash')).click();
      browser.wait(countOfElementsToBeGreaterThan(applications, count + 1), 5000);
      expect(applications.count()).toEqual(count);
    });

  });

});
