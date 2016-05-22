(function() {
	'use strict';

	angular
		.module('host')
		.controller('HostController', Controller);

	function Controller() {

		this.designate = designate;

		class Adress {

			constructor(ip) {
				this.ip = ip;
			}

			count() {
				return this.toBinary();
			}

			toBinary() {
				console.log(this.ip.toString(2));
			}
		}

		function designate(ip) {
			new Adress(ip).calc;
		}
	}



})();