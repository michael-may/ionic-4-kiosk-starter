// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
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
		countdown: 1500, // Time in seconds to countdown after the alert has popped up (Default: 15)
		excludedPages: ['/load', '/setup', '/home']
	}
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
