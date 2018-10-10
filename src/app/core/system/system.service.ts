import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class SystemService {
    public env = environment;
    public loadComplete: boolean = false;

    constructor() {}

    public hasUndefinedInputs(): boolean {
        for(let i = 0; i < this.env.setupInputs.length; i++) {
            if(localStorage.getItem(this.env.setupInputs[i].name) === null) {
                return true;
            }
        }

        return false;
    }

}