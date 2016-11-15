import { Injectable } from '@angular/core';

@Injectable()
export class ProviderColorService {

    private providerMap = {
        amazon: '#ff9900',
        rackspace: '#c40022',
        google: '#4285f4',
        microsoftazure: '#45ace8',
        joyent: '#868780',
        digitalocean: '#00fcff'
    };

    constructor() {

    }

    getColorForProvider(providerName: string) {
        let name = providerName.trim().replace(' ', '').toLowerCase();
        if (this.providerMap.hasOwnProperty(name)) {
            return this.providerMap[name];
        }
        return '#ffffff';
    }

}
