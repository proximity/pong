var Backbone = require('backbone');

var PhoneView = Backbone.View.extend({
	el: 'body',
	initialize: function() {
		console.log('here phone');
	},
});

module.exports = PhoneView;
