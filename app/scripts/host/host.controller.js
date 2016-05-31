(function() {
	'use strict';

	angular
		.module('host')
		.controller('HostController', Controller);

	function Controller($scope) {

		this.designate = designate;

		this.subnet = [
			{
				'CIDR': '/1',
				'adr': '128.0.0.0'
			},
			{
				'CIDR': '/2',
				'adr': '192.0.0.0'
			},
			{
				'CIDR': '/3',
				'adr': '224.0.0.0'
			},
			{
				'CIDR': '/4',
				'adr': '240.0.0.0'
			},
			{
				'CIDR': '/5',
				'adr': '248.0.0.0'
			},
			{
				'CIDR': '/6',
				'adr': '252.0.0.0'
			},
			{
				'CIDR': '/7',
				'adr': '254.0.0.0'
			},
			{
				'CIDR': '/8',
				'adr': '255.0.0.0'
			},
			{
				'CIDR': '/9',
				'adr': '255.128.0.0'
			},
			{
				'CIDR': '/10',
				'adr': '255.192.0.0'
			},
			{
				'CIDR': '/11',
				'adr': '255.224.0.0'
			},
			{
				'CIDR': '/12',
				'adr': '255.240.0.0'
			},
			{
				'CIDR': '/13',
				'adr': '255.248.0.0'
			},
			{
				'CIDR': '/14',
				'adr': '255.252.0.0'
			},
			{
				'CIDR': '/15',
				'adr': '255.254.0.0'
			},
			{
				'CIDR': '/16',
				'adr': '255.255.0.0'
			},
			{
				'CIDR': '/17',
				'adr': '255.255.128.0'
			},
			{
				'CIDR': '/18',
				'adr': '255.255.192.0'
			},
			{
				'CIDR': '/19',
				'adr': '255.255.224.0'
			},		
			{
				'CIDR': '/20',
				'adr': '255.255.240.0'
			},
			{
				'CIDR': '/21',
				'adr': '255.255.248.0'
			},
			{
				'CIDR': '/22',
				'adr': '255.255.252.0'
			},
			{
				'CIDR': '/23',
				'adr': '255.255.254.0'
			},
			{
				'CIDR': '/24',
				'adr': '255.255.255.0'
			},
			{
				'CIDR': '/25',
				'adr': '255.255.255.128'
			},
			{
				'CIDR': '/26',
				'adr': '255.255.255.192'
			},
			{
				'CIDR': '/27',
				'adr': '255.255.255.224'
			},
			{
				'CIDR': '/28',
				'adr': '255.255.255.248'
			},
			{
				'CIDR': '/29',
				'adr': '255.255.255.252'
			},
			{
				'CIDR': '/30',
				'adr': '255.255.255.254'
			}
		];

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

			static checkInput(ip, mask) {
				var valid = true;
				if(mask === undefined)
					return false;
				ip.forEach(function(item, index) {
					item = parseInt(item);
					if(item > 255 || item < 0)
						valid = false;
						return false;
					ip[index] = item;
				});
				if(valid == false)
					return false
				return new Adress(ip, mask).opHosts();
			}

			toBinary() {

				var binIP = [];
				var binMask = [];				

				function Binary(ip, mask) {
					this.ip = ip;
					this.mask = mask;
				}

				this.ip.forEach(function(item, index) {
					binIP.push(('00000000'+(parseInt(item).toString(2))).slice(-8));
				});
				this.mask.forEach(function(item, index) {
					binMask.push(('00000000'+(parseInt(item).toString(2))).slice(-8));
				});
				return new Binary(binIP, binMask);
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

				$scope.binary.ip.forEach(function(item, index) {
					stringIP += item;
				});
				$scope.binary.mask.forEach(function(item, index) {
					stringMask += item;
				});

				splitIP = stringIP.split('');
				splitMask = stringMask.split('');

				return new Compare(splitIP, splitMask);		
			}

			networkAdress() {

				var separated = [];
				var adressNetwork = [];

				$scope.compare.ip.forEach(function(item, index) {
					if($scope.compare.mask[index] == '1') {
						separated.push(item);
					} else {
						separated.push('0');
					}
				});

				var string = separated.join('');
				var raw = string.match(/.{1,8}/g);

				raw.forEach(function(item, index) {
					adressNetwork.push(item);
				});
				return adressNetwork;
			}

			broadcastAdress() {

				var separated = [];
				var adressBroadcast = [];

				$scope.compare.ip.forEach(function(item, index) {
					if($scope.compare.mask[index] == '0') {
						separated.push(item);
					} else {
						separated.push('0');
					}
				});

				var string = separated.join('');
				var raw = string.match(/.{1,8}/g);

				raw.forEach(function(item, index) {
					adressBroadcast.push(item);
				});
				return adressBroadcast;
			}

			binaryToDecimal(array) {

				var decimal = [];

				array.forEach(function(item, index) {
					decimal.push(parseInt(item, 2));
				});
				return decimal;
			}
		}

		function designate(adress) {
			adress.ip = adress.ip.split('.');
			adress.mask = adress.mask.split('.');
			if(Adress.checkInput(adress.ip, adress.mask) === false)
				alert("Wrong IP adress format!");
			this.adress = {};		
		}
	}

})();