import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { LoadGuard } from './guards/load.guard';

import { SystemService } from './system/system.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        //SharedModule
    ],
    exports: [],
    declarations: [],
    providers: [
        LoadGuard,
        SystemService//,
        //{ provide: ErrorHandler, useClass: CrashReportingErrorHandler }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if(parentModule) {
            throw new Error(`Core Module has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}