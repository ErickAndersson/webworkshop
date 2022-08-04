/*
$scope.beers is a list with all the information about the present beers on the DB.
$scope.beer is the particular beer we want to add or do something with.
*/

angular.module('app',[])
    .controller('myController', function($scope, $http){
        console.log("$http=",$http);
        
        //Get the data via refresh.
        var refresh = function(){
            console.log("Refreshing");
            $http.get('/beer/')
                .then(function(response){
                    console.log("All righty.", response);
                    $scope.beers = response.data;
                    $scope.newBeer = ({});
                }, function errorCallback(response){
                    console.log("Something unexpected ocurred", response);
                });
        };

        refresh();
        $scope.propertyName = 'name';
        $scope.reverse = true;

        $scope.sortBy = function(propertyName){
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        //Add beer
        $scope.addBeer = function(){
            console.log("Beer about to add=", $scope.newBeer);
            //I do not need to check for existence because that's already done on the controller.
            $http.post('/beer/', $scope.newBeer)
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
            $http.delete('/beer/' + name)
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
        $scope.filterBeers = function(style){
            if(style!=''){
                console.log("About to filter the beers with style", style);
                $http.get('/beer/style/' + style)
                .then(function(response){
                    console.log("All righty.", response);
                    $scope.beers = response.data;
                    $scope.newBeer = ({}); //Maybe optional
                }, function errorCallback(response){
                    console.log("Something unexpected ocurred", response);
                });
            }
            else{
                refresh();
            }
        }

        //Deselect
        $scope.deselect = function(){
            $scope.newBeer = ({});
        }
    });