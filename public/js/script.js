var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    $scope.getbookAppointments = function(){
        var obj = {};
        $scope.timeArr = [];
        $http.post("/get",obj)
        .then(function(response) {
            $scope.time.forEach(timeElement => {
                var ob = {};
                ob["classval"] = "bg-success";
                ob["name"] = "";
                ob["phone"] = "";
                if(response && response.data.length>0){
                    response.data.forEach(element => {
                        if(timeElement == element.time){
                            ob["classval"] = "bg-danger";
                            ob["name"] = element.name;
                            ob["phone"] = element.phone;
                        }
                    });
                }
                ob["time"] = timeElement; 
                $scope.timeArr.push(ob);                   
            });
        });
    }

    $scope.init =function(){
        $scope.time =["9AM - 10AM","10AM - 11AM","11AM - 12PM","12PM - 1PM","1PM - 2PM","2PM - 3PM","3PM - 4PM","4PM - 5PM"]
        $scope.name;
        $scope.phone;
        $scope.getbookAppointments();    
    }

    
    $scope.book = function(){
        var obj = {
            time:$scope.modelTime,
            name:$scope.name,
            phone:$scope.phone
        };
        $http.post("/create",obj)
        .then(function(response) {
            $scope.getbookAppointments(); 
        });
    }

    $scope.modelOpen = function(val){
        $scope.name = val.name;
        $scope.phone = val.phone;
        $scope.modelTime = val.time;
    }
});