(function () {
	'use strict';

	angular
		.module('host')
		.directive('host', function() {
			return {
				restrict: 'E',
				templateUrl: 'scripts/host/host.html',
				controller: 'HostController',
				controllerAs: 'host'
			}
		});

})();