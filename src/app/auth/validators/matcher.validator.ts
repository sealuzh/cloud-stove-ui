/**
 * @module AuthModule
 */ /** */

import { FormGroup } from '@angular/forms';

export class PasswordMatcher {

  static matchingPasswords(g: FormGroup) {
    return g.get('password').value === g.get('password_confirm').value ? null : {'mismatch': true};
  }

}
