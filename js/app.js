angular.module('myApp', [])
.controller('InstagramCtrl', function($scope, $http){
	$scope.search = '';
	$scope.last = '';
	$scope.instaSearch =  function(){
		if($scope.instaForm.$valid) {
			searchFunction($scope.search);
		} 
	};
	var searchFunction = function(query){
		$scope.loaded = false;
		$scope.last = query;
		$http.jsonp(
			'https://api.instagram.com/v1/tags/' + query + '/media/recent',
			{
					params: 
					{
					callback: 'JSON_CALLBACK',
					client_id: '2986d0941e7f430db5544c19f30adbe3'
				}
			}
		).success(function(response){
			console.log(response.data);
			$scope.pictures = response.data;
			$scope.instaForm.$submitted = false;
			$scope.search = '';			
			$scope.loaded = true;
		});
	};
});