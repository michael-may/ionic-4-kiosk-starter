import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SystemService } from '../../core/system/system.service';

@Component({
  selector: 'app-setup',
  templateUrl: 'setup.page.html',
  styleUrls: ['setup.page.scss'],
})
export class SetupPage {
    public inputs: Array<any>;
    public model: Object = {};
    
    public env;

    constructor(
        private router: Router,
        private systemService: SystemService
    ) {
        this.env = this.systemService.env;
        this.inputs = this.env.setupInputs;
    }

    ionViewWillEnter() {
        this.getCurrentValues();
    }

    public getCurrentValues(): void {
		this.inputs.forEach((input) => {
			let val = localStorage.getItem(input.name);
			this.model[input.name] = val || '';
		});
    }
    
    public save(event: Event): void {
		event.preventDefault();

		Object.keys(this.model).forEach((key) => {
			let val = this.model[key];
			localStorage.setItem(key, val);
        });
        
        this.router.navigateByUrl(this.env.defaultPagePath, { replaceUrl: true });
	}
}
