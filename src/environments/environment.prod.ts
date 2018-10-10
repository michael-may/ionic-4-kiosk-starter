export const environment = {
  production: true,
  defaultPagePath: '',
  setupInputs: [
		{
			name: 'deviceId',
			display_name: 'The unique identifier for this device',
			type: 'text'
		}
  ],
  timeoutComponentConfig: {
		title: '',
		message: 'Are you still exploring?',
		buttonText: 'Yes!',
		delay: 120, // Time in seconds before we ask if the user is still there (Default: 120)
		countdown: 15, // Time in seconds to countdown after the alert has popped up (Default: 15)
		excludedPages: ['/load', '/setup', '/home']
	}
};
