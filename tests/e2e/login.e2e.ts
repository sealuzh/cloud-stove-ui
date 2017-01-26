import { browser, by, element } from 'protractor';
import {LoginHelper} from "./helper/loginHelper";

describe('/login', () => {

  let loginHelper = new LoginHelper(browser);

  beforeEach(() => {
    browser.get('/login');

    // clear local storage
    browser.executeScript('window.localStorage.clear();');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('The Cloud Stove');
  });

  it('should display the login fields, if the user is not logged-in', () => {
    expect(element(by.css('[formcontrolname=email]')).isPresent()).toEqual(true);
    expect(element(by.css('[formcontrolname=password]')).isPresent()).toEqual(true);
  });

  it('should display an error message if the login is unsuccessful', () => {
    let email = element(by.css('[formcontrolname=email]'));
    let password = element(by.css('[formcontrolname=password]'));
    let submit = element(by.css('button'));

    email.sendKeys('wrong@email.ch');
    password.sendKeys('wrongaswell');

    submit.click();

    expect(element(by.css('div.alert.alert-warning > p')).isPresent()).toEqual(true);
    expect(element(by.css('div.alert.alert-warning > p')).getText()).toEqual('Please check your E-Mail and password.');
  });

  it('should require a minimum length of 8 characters for passwords', () => {
    let email = element(by.css('[formcontrolname=email]'));
    let password = element(by.css('[formcontrolname=password]'));
    let submit = element(by.css('button'));

    email.sendKeys('wrong@email.ch');
    password.sendKeys('shortpw');

    expect(submit.isEnabled()).toBe(false);

    password.sendKeys('verylongpw');

    expect(submit.isEnabled()).toBe(true);
  });

  it('should successfully log a user in', () => {
    let email = element(by.css('[formcontrolname=email]'));
    let password = element(by.css('[formcontrolname=password]'));
    let submit = element(by.css('button'));

    email.sendKeys(loginHelper.email);
    password.sendKeys(loginHelper.password);

    submit.click();

    expect(waitForUrlToChangeTo(new RegExp('applications'))).toBe(true);
  });

});

function waitForUrlToChangeTo(urlRegex) {
    let currentUrl;

    return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
            currentUrl = url;
        }
    ).then(function waitForUrlToChangeTo() {
            return browser.wait(function waitForUrlToChangeTo() {
                return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
                    return urlRegex.test(url);
                });
            });
        }
    );
}
