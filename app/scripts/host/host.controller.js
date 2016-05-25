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
				var ipArray = this.ip.split('.');
				var maskArray = this.mask.split('.');

				var binary = [];

				ipArray.forEach(function(i, d) {

					binary.push(parseInt(i).toString(2));
				});

				// maskArray.forEach(function(i, d) {
				// 	binary.push(parseInt(i).toString(2));
				// });

				console.log(binary);
				// $scope.ip = this.ip.toString(2);
				// $scope.mask = this.mask.toString(2);
			}
		}

		function designate(adress) {
			var obj = new Adress(adress.ip, adress.mask);
			this.adress = {};
			return obj.count();
		}
	}

})();