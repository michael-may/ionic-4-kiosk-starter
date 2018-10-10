import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { TimeoutComponent } from './timeout/timeout.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		TimeoutComponent
	],
	providers: [],
	entryComponents: [],
	exports: [
		CommonModule,
		TimeoutComponent
	]
})
export class SharedModule { }
