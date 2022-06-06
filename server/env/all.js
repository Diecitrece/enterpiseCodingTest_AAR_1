'use strict';

module.exports = {
	app: {
		title: 'Book Club',
		description: 'Book Club',
		keywords: 'Book, Club'
	},
	port: process.env.PORT || 3000,
	log: {
		strategy: 'console',
		setting: {
			format: '{{timestamp}} {{title}} {{file}} {{method}}:{{line}} {{message}}',
			dateformat: 'yyyy/mm/dd HH:MM:ss',
			preprocess: function(data) {
				data.title = data.title.toUpperCase();
			}
		}
	}
};
