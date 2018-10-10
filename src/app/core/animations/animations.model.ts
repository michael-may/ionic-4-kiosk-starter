import { animation, style, animate, group } from '@angular/animations';

export var slideUpFadeIn = animation([
	style({ opacity: '{{ opacityFrom }}', transform: '{{ transformFrom }}' }),
	animate('{{ time }}', style({ opacity: '{{ opacityTo }}', transform: '{{ transformTo }}' }))
], {
	params: {
		time: '1s 1s cubic-bezier(0.19, 1, 0.22, 1)',
		opacityFrom: '0',
		opacityTo: '1',
		transformFrom: 'translate3d(0, 10%, 0)',
		transformTo: 'translate3d(0, 0, 0)'
	}
});

export var slideUpFadeOut = animation([
	style({ opacity: '{{ opacityFrom }}', transform: '{{ transformFrom }}' }),
	animate('{{ time }}', style({ opacity: '{{ opacityTo }}', transform: '{{ transformTo }}' }))
], {
	params: {
		time: '1s 1s cubic-bezier(0.19, 1, 0.22, 1)',
		opacityFrom: '1',
		opacityTo: '0',
		transformFrom: 'translate3d(0, 0, 0)',
		transformTo: 'translate3d(0, 10%, 0)'
	}
});


export var backgroundSlideIn = animation([
	style({ opacity: '{{ opacityFrom }}', transform: '{{ transformFrom }}' }),
	group([
		animate('{{ opacityTime }}', style({ opacity: '{{ opacityTo }}' })),
		animate('{{ transformTime }}', style({ transform: '{{ transformTo }}' })),
	])
], {
	params: {
		opacityTime: '2s linear',
		opacityFrom: '0',
		opacityTo: '1',
		transformTime: '12s linear',
		transformFrom: 'translate3d(0, 0, 0)',
		transformTo: 'translate3d(-30%, 0, 0)'
	}
});

export var backgroundSlideOut = animation([
	group([
		animate('{{ opacityTime }}', style({ opacity: '{{ opacityTo }}' })),
		animate('{{ transformTime }}', style({ transform: '{{ transformTo }}' })),
	])
], {
	params: {
		opacityTime: '2s linear',
		opacityFrom: '1',
		opacityTo: '0',
		transformTime: '3s linear',
		transformTo: 'translate3d(-34%, 0, 0)'
	}
});