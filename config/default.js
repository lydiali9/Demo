'use strict';

module.exports = {
	port: 8081,
	url: 'mongodb://localhost:27017/pie_media',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   true,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}