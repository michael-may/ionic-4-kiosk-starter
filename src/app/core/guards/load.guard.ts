import { Injectable } from '@angular/core';
import { 
    Router,
    CanLoad,
    Route
} from '@angular/router';

import { SystemService } from '../system/system.service';

@Injectable()
export class LoadGuard implements CanLoad {

    constructor(
        private router: Router,
        private systemService: SystemService
    ) {}

    canLoad(route: Route): boolean {
        if(this.systemService.loadComplete) {
            return true;
        } else {
            // This kind of set up would let you deeplink and preload at the same time.
            // You'd use the "ref" param to navigate back where the user originally tried to load
            // Note, this may clog up your router outlet with old pages
            // this.router.navigate(['/load'], {
            //     skipLocationChange: true,
            //     queryParams: {
            //         ref: route.path
            //     }
            // });
            this.router.navigate(['/load'], { skipLocationChange: true });
            return false;
        }
    }
}