import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  public apiUrl = config.API_URL || 'http://localhost:3000';
}
