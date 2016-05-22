(function() {
	'use strict';

	angular
		.module('host')
		.controller('HostController', Controller);

	function Controller($scope) {

		this.designate = designate;

		class Adress {

			constructor(ip, mask) {
				this.ip = ip;
				this.mask = mask;
			}

			count() {
				return this.toBinary();
			}

			toBinary() {
				$scope.ip = this.ip.toString(2);
				$scope.mask = this.mask.toString(2);
			}
		}

		function designate(adress) {
			var obj = new Adress(adress.ip, adress.mask);
			this.adress = {};
			return obj.count();
		}
	}

})();