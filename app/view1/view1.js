'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as view'
  });
}])
    .controller('View1Ctrl', function($scope, $http) {
		
		$scope.categories = {};
		$scope.countries  = {};
		$scope.categories.category = [
			{
				type: 'Business'
			},{
				type: 'Entertainment'
			},{
				type: 'Health'
			},{
				type: 'Science'
			},{
				type: 'Sports'
			},{
				type: 'Technology'
			}

		];
		
		$scope.countries.country = [
			{
				name: 'India',
				code: 'in'
			},{
				name: 'Netherlands',
				code: 'nl'
			},{
				name: 'United States',
				code: 'us'
			},{
				name: 'Germany',
				code: 'de'
			},{
				name: 'France',
				code: 'fr'
			},{
				name: 'Belgium',
				code: 'be'
			},{
				name: 'Australia',
				code: 'au'
			},{
				name: 'New Zealand',
				code: 'nz'
			}
		];
		
		$scope.categories.cat = $scope.categories.category[0].type;
		$scope.countries.cou = $scope.countries.country[0].code;
	
		$scope.init = function(){
			$scope.callNewsApi($scope.countries.cou, $scope.categories.cat);
		};
		$scope.message = false;
        $scope.callNewsApi = function(countryCode, categoryType){
			console.log(categoryType.toLowerCase())
			$scope.articles = [];
			$scope.spinner = true;
			$http({
                method : "GET",
                url : "https://newsapi.org/v2/top-headlines?country="+countryCode+"&category="+categoryType.toLowerCase()+"&apiKey=0b43740f602c4715bd2394102f65fe1e",
				headers: { 'Content-Type': 'application/json; charset=utf-8'},
            }).then(function(response) {
				$scope.message = false;
		        $scope.articles = response.data.articles;
				$scope.spinner = false;
            }).catch(function(error) {
				$scope.message = true;
                $scope.spinner = false;
            });
		}
		
    });