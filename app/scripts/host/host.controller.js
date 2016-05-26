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

			opHosts() {
				$scope.binary = this.toBinary();
				$scope.compare = this.splitBinary();
				if($scope.binary)
					this.splitBinary();
				if($scope.compare)
					this.networkAdress();
					this.broadcastAdress();
			}

			fillBinary(ip, mask) {

				var binIP = [];
				var binMask = [];

				function Binary(binIP, binMask) {
					this.ip = binIP;
					this.mask = binMask;
				}

				ip.forEach(function(i, d) {
					binIP.push(('00000000'+i).slice(-8));
				});
				mask.forEach(function(i, d) {
					binMask.push(('00000000'+i).slice(-8));
				});				
				return new Binary(binIP, binMask);
			}

			toBinary() {
				this.ip = this.ip.split('.');
				this.mask = this.mask.split('.');

				var ip = [];
				var mask = [];

				this.ip.forEach(function(i, d) {
					ip.push(parseInt(i).toString(2));
				});
				this.mask.forEach(function(i, d) {
					mask.push(parseInt(i).toString(2));
				});
				return this.fillBinary(ip, mask);
			}

			splitBinary() {
				var splitIP = [];
				var splitMask = [];

				var stringIP = '';
				var stringMask = '';

				function Compare(ip, mask) {
					this.ip = ip;
					this.mask = mask;
				}

				$scope.binary.ip.forEach(function(i, d) {
					stringIP += i;
				});
				$scope.binary.mask.forEach(function(i, d) {
					stringMask += i;
				});

				splitIP = stringIP.split('');
				splitMask = stringMask.split('');

				return new Compare(splitIP, splitMask);		
			}

			networkAdress() {
				$scope.adressNetwork = [];

				$scope.compare.ip.forEach(function(i, d) {
					if($scope.compare.mask[d] == '1') {
						$scope.adressNetwork.push(i);
					} else {
						$scope.adressNetwork.push('0');
					}
				});
			}

			broadcastAdress() {
				$scope.adressBroadcast = [];

				$scope.compare.ip.forEach(function(i, d) {
					if($scope.compare.mask[d] == '0') {
						$scope.adressBroadcast.push(i);
					} else {
						$scope.adressBroadcast.push('0');
					}
				});
			}
		}

		function designate(adress) {
			var obj = new Adress(adress.ip, adress.mask);
			this.adress = {};
			return obj.opHosts();
		}
	}

})();