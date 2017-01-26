import { promise } from 'selenium-webdriver';
import { browser } from 'protractor';

export class LocalStorageHelper {

    private browser: any;

    constructor(browser: any) {
        this.browser = browser;
    }

    getItem(key): promise.Promise<any> {
        return browser.executeScript(`return window.localStorage.getItem('${key}');`);
    }

    setItem(key, value): promise.Promise<any> {
        return browser.executeScript(`return window.localStorage.setItem('${key}', '${value}');`);
    }

    clear(): promise.Promise<any> {
        return browser.executeScript('return window.localStorage.clear();');
    }

};
