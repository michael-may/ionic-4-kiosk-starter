import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SystemService } from '../../core/system/system.service';

@Component({
  selector: 'app-load',
  templateUrl: 'load.page.html',
  styleUrls: ['load.page.scss'],
})
export class LoadPage {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private systemService: SystemService
    ) {}

    ionViewDidEnter() {
        
        // Do loading operations...
        this.systemService.loadComplete = true;

        // Simulate load
        setTimeout(() => {

            this.route.queryParams
                .subscribe((params) => {
                    let ref = params['ref'] || this.systemService.env.defaultPagePath;


                    // This kind of set up would let you deeplink and preload at the same time.
                    // You'd use the "ref" param to navigate back
                    // if(this.systemService.hasUndefinedInputs()) {
                    //     this.router.navigate(['setup'], {
                    //         replaceUrl: true,
                    //         queryParams: {
                    //             ref: ref
                    //         }
                    //     });
                    // } else {
                    //     this.router.navigate([ref], { replaceUrl: true });
                    // }

                    if(this.systemService.hasUndefinedInputs()) {
                        this.router.navigate(['/setup'], { skipLocationChange: true });
                    } else {
                        this.router.navigate([this.systemService.env.defaultPagePath], { replaceUrl: true });
                    }
                });
        }, 250);
    }
}
