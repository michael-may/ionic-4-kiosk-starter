import {
    Component,
    HostListener,
    Input,
    Output,
    EventEmitter,
    OnChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';

import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';

import { SystemService } from '../../core/system/system.service';

import { slideUpFadeIn, slideUpFadeOut } from '../../core/animations';

@Component({
    selector: 'app-timeout',
    templateUrl: 'timeout.component.html',
    styleUrls: ['timeout.component.scss'],
    animations: [
		trigger('slideUpFadeIn', [
			transition('void => *', [
				useAnimation(slideUpFadeIn, { params: {
					time: '0s 500ms ease-in-out'
				} })
			]),
			transition('* => void', [
				useAnimation(slideUpFadeOut, { params: {
					time: '0s 500ms ease-in-out'
				} })
			])
		])
	]
})
export class TimeoutComponent implements OnChanges {
	@Input('didTimeOut') didTimeOut: boolean;
	@Input('refreshTimer') refreshTimer: any;
    @Output('timeoutReset') timeoutReset: EventEmitter<boolean> = new EventEmitter<boolean>();
    
	public buttonText: string;
	public countdown: Subscription;
	public countdownDelay: number;
	public currentCountdownNumber: number;
	public delay: number;
	public excludedPages: Array<any> = [];
	public message: string;
	public timer: Subscription;
	public title: string;
	public showModal: boolean = false;

    // Listen for any click event to reset our timer
	@HostListener('document:touchstart', ['$event.target'])
	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement) {
		this.resetTimer();
    }
    
    private env;

    constructor(
        private router: Router,
        private systemService: SystemService
    ) {
        this.env = this.systemService.env;
    }

    ngOnChanges(changes) {
		if(changes.didTimeOut) {
			if(changes.didTimeOut.currentValue === true) {
				if(this.shouldShowAlert()) {
					this.showAlert();
				}
			}
		}
		if(changes.refreshTimer) {
			if(changes.refreshTimer.currentValue) {
				if(!this.showModal) {
					this.resetTimer();
				}
			}
		}
	}

    ngAfterViewInit() {
		this.countdownDelay = this.env.timeoutComponentConfig.countdown * 1000 || 15000;
		this.delay = this.env.timeoutComponentConfig.delay * 1000 || 120000;
		this.message = this.env.timeoutComponentConfig.message || '<p>Are you still using this app?</p>';
		this.title = this.env.timeoutComponentConfig.title || 'Still Using this app?';
		this.buttonText = this.env.timeoutComponentConfig.buttonText || 'Yes';

		if (this.env.timeoutComponentConfig.excludedPages) {
			this.excludedPages = this.env.timeoutComponentConfig.excludedPages;
		}

		this.startTimer();
    }

    ngOnDestroy() {
		this.destroy();
	}
    
    public startTimer(): Subscription {
		return this.timer = Observable.interval(this.delay)
			.subscribe(data => {
				if (this.shouldShowAlert()) {
					this.showAlert();
				}
			});
    }

    public stopTimer(): void {
		if(this.timer) {
			this.timer.unsubscribe();
		}
	}

    public startCountdown(): Subscription {
		this.currentCountdownNumber = this.countdownDelay / 1000;
		return this.countdown = Observable.interval(1000)
			.subscribe(data => {
				this.currentCountdownNumber--;
				if (this.currentCountdownNumber <= 0) {
					this.hideAlert(true);
                    this.stopCountdown();
                    this.goToDefault();
				}
			});
    }
    
    public stopCountdown(): void {
		if(this.countdown) {
			this.countdown.unsubscribe();
		}
	}

    public showAlert(): void {
		this.timer.unsubscribe();
		this.startCountdown();
		this.showModal = true;
    }
    
    public hideAlert(resetTimer?: boolean): void {
		if (resetTimer) {
			this.stopCountdown();
			this.resetTimer();
		}
		this.showModal = false;
		this.didTimeOut = false;
	}

    public resetTimer(): Subscription {
		if(this.timer) {
			this.timer.unsubscribe();
		}
		return this.startTimer();
    }
    
    private shouldShowAlert(): boolean {
		// Already up
		if(this.showModal) {
			return false;
        }
        
        let view: string = this.router.url;
        let onExcludedPage: boolean = false;

        this.excludedPages.forEach((pageName) => {
            if (view === pageName) {
                onExcludedPage = true;
            }
        });

        console.log(onExcludedPage);

		return !onExcludedPage;
    }

    private goToDefault() {
        let ref = this.env.defaultPagePath || '/';
        this.router.navigate([ref], { replaceUrl: true });
    }
    
    private destroy() {
		this.stopCountdown();
		this.stopTimer();
		this.showModal = false;
		this.didTimeOut = false;
	}
}