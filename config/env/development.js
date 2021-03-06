'use strict';

module.exports = {
	db: {
		//uri: 'mongodb://localhost/mean-dev',
		uri: 'mongodb://166.111.71.115:30000/csvtest',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'TsingShare - the best app for lovers'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || '{"Henan Wang": "15210588630@163.com"}',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'smtp.163.com', /*TODO this configuration maybe wrong*/
			host: 'smtp.163.com',
			port: 25,
			auth: {
				user: process.env.MAILER_EMAIL_ID || '15210588630@163.com',
				pass: process.env.MAILER_PASSWORD || 'whn159024'
			}
		}
	}
};
