var Backbone = require('backbone');

var PhoneView = Backbone.View.extend({
	el: 'body',
	initialize: function() {

		$('#mobile-container-top').on('touchstart', function() {
			console.log('touch top');
		});

		$('#mobile-container-bottom').on('touchstart', function() {
			console.log('touch bottom');
		});

	}
});

module.exports = PhoneView;
