//Don't know yet why there are two app.js, or index.js, but still I'll do it the way they showed it.

/*
$scope.beers is a list with all the information about the present beers on the DB.
$scope.beer is the particular beer we want to add or do something with.
*/

angular.module('app',[])
    .controller('myController', function($scope, $http){
        console.log("$http=",$http);
        //Get the data via refresh.
        var refresh = function(){
            //$http.get('/beer')
            $http.get('/beer/')
                .then(function(response){
                    console.log("All righty.", response);
                    $scope.beers = response.data;
                    $scope.beer = ({});
                }, function errorCallback(response){
                    console.log("Something unexpected ocurred", response);
                });
        };
        refresh();
        $scope.propertyName = 'style';
        $scope.reverse = true;

        $scope.sortBy = function(propertyName){
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        //Add beer
        $scope.addBeer = function(){
            console.log("Beer about to add=", $scope.beer);
            //I do not need to check for existence because that's already done on the controller.
            $http.post('/', $scope.beer)
            .then(function(response){
                refresh();
                console.log("Added successfully", response);
            }, function errorCallback(response){
                console.log("Couldn't complete the add operation", response);
            });
        };

        //Remove beer
        $scope.remove = function(name){
            console.log("Beer about to delete=", name);
            $http.delete('/' + name)
            .then(function(response){
                refresh();
                console.log("Deleted successfully", response);
            }, function errorCallback(response){
                console.log("Couldn't complete the delete operation", response);
            });
        };

        //Edit beer (maybe not)

        //Update beer

        //Filter beer

        //Deselect
        $scope.deselect = function(){
            $scope.beer = ({});s
        }
    });