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

		class Basic {

			constructor(ip_binary, mask_binary, ip_decimal, mask_decimal) {
				this.ip_binary = ip_binary;
				this.mask_binary = mask_binary;
				this.ip_decimal = ip_decimal;
				this.mask_decimal = mask_decimal;
			}

			static toBinary(ip, mask) {

				var ip_bin = [];
				var mask_bin = [];				

				ip.forEach(function(item, index) {
					ip_bin.push(('00000000'+(parseInt(item).toString(2))).slice(-8));
				});
				mask.forEach(function(item, index) {
					mask_bin.push(('00000000'+(parseInt(item).toString(2))).slice(-8));
				});
				$scope.basic = new Basic(ip_bin, mask_bin, ip, mask);
				return $scope.basic.preAdresses();
			}

			preAdresses() {

				var ip_split = [];
				var mask_split = [];

				var ip_string = '';
				var mask_string = '';

				function Compare(ip, mask) {
					this.ip = ip;
					this.mask = mask;
				}

				this.ip_binary.forEach(function(item, index) {
					ip_string += item;
				});
				this.mask_binary.forEach(function(item, index) {
					mask_string += item;
				});

				ip_split = ip_string.split('');
				mask_split = mask_string.split('');

				$scope.network = Network.networkAdress(ip_split, mask_split);
				$scope.broadcast = Broadcast.broadcastAdress(ip_split, mask_split);
				$scope.numberOf = Host.numberOfHosts($scope.network, $scope.broadcast, this.mask_binary);
			}
		}

		class Host {

			constructor(binary, decimal) {
				this.binary = binary;
				this.decimal = decimal;
			}

			static markHost(ip, num) {
				var temp = [];
				ip.forEach(function(item, index) {
					temp.push(item);
				});
				temp[3] = (temp[3]+num);
				var binary = Host.decimalToBinary(temp);
				return new Host(binary, temp);
			}

			static decimalToBinary(array) {

				var binary = [];

				array.forEach(function(item, index) {
					binary.push(('00000000'+(parseInt(item).toString(2))).slice(-8));;
				});
				return binary;				
			}

			static numberOfHosts(network, broadcast, mask) {
				var total = 0;
				var values = [];
				mask.forEach(function(a, b) {
					if(a < 255) {
						var res = (network.decimal[b]-broadcast.decimal[b])-1;
						if(res < 0)
							res = -res
						values.push(res);
					}
				});
				// pomnożyć przez siebie elementy tablicy, stosując switch albo elseif
				return total;
			}
		}

		class Adress {

			constructor(binary, decimal) {
				this.binary = binary;
				this.decimal = decimal;
			}

			static binaryToDecimal(array) {

				var decimal = [];

				array.forEach(function(item, index) {
					decimal.push(parseInt(item, 2));
				});
				return decimal;
			}

		}

		class Network extends Adress {

			static networkAdress(ip, mask) {

				var separated = [];
				var binary = [];

				ip.forEach(function(item, index) {
					if(mask[index] == '1') {
						separated.push(item);
					} else {
						separated.push('0');
					}
				});

				var string = separated.join('');
				var raw = string.match(/.{1,8}/g);

				raw.forEach(function(item, index) {
					binary.push(item);
				});
				var decimal = super.binaryToDecimal(binary);
				$scope.minHost = Host.markHost(decimal, 1);
				return new Adress(binary, decimal);
			}	
		}

		class Broadcast extends Adress {

			static broadcastAdress(ip, mask) {

				var separated = [];
				var binary = [];

				ip.forEach(function(item, index) {
					if(mask[index] == '1') {
						separated.push(item);
					} else {
						separated.push('1');
					}
				});

				var string = separated.join('');
				var raw = string.match(/.{1,8}/g);

				raw.forEach(function(item, index) {
					binary.push(item);
				});
				var decimal = super.binaryToDecimal(binary);
				$scope.maxHost = Host.markHost(decimal, -1);
				return new Adress(binary, decimal);
			}			
		}

		function designate(adress) {
			adress.ip = adress.ip.split('.');
			adress.mask = adress.mask.split('.');
			if(checkInput(adress.ip, adress.mask) === false)
				alert("Wrong IP adress format!");
			this.adress = {};		
		}

		function checkInput(ip, mask) {
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
				return Basic.toBinary(ip, mask);
			}
	}

})();