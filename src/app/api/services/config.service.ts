/**
 * @module ApiModule
 */ /** */

import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  public apiUrl = process.env.API_URL || 'http://localhost:3000';
}
