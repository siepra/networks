(function() {
	'use strict';

	$('#ip')
		.mask('0ZZ.0ZZ.0ZZ.0ZZ', {
			translation: {
				'Z': {
					pattern: /[0-9]/,
					optional: true
				}
			}
		});

})();