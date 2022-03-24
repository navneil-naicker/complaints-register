var app = angular.module("WebApp", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "templates/browse.html",
        controller: "ComplaintsBrowseController"
    })
    .when("/create", {
        templateUrl: "templates/upsert.html",
        controller: "ComplaintsCreateController"
    })
    .when("/edit/:id", {
        templateUrl: "templates/upsert.html",
        controller: "ComplaintsEditController"
    })
    .otherwise({
        templateUrl: "templates/404.html",
    });
});

app.controller("ComplaintsBrowseController", function($scope, $http){
    $scope.heading = "Complaints";
    $http({url: "http://localhost:20037/api/Complaints", method: "GET"}).then(function(response){
        $scope.data = response.data;
        console.log(response);
    }, function(response){
        console.log(response);
    });
    $scope.delete = function($event, id){
        $event.preventDefault();
        $http({url: "http://localhost:20037/api/Complaints/" + id, method: "DELETE"}).then(function(response){
            alert("Form has been deleted successfully.");
            window.location = '/#!';
            console.log(response);
        }, function(response){
            console.log(response);
        });
    }
});

app.controller("ComplaintsCreateController", function($scope, $http){
    $scope.heading = "Complaint - Create";
    $scope.submit = function(){
        var data = {
            "FullName": $scope.FullName,
            "EmailAddress": $scope.EmailAddress,
            "PhoneNumber": $scope.PhoneNumber,
            "ResidentialAddress": $scope.ResidentialAddress,
            "Description": $scope.Description,
            "Status": $scope.Status
        };
        console.log(data);
        $http({url: "http://localhost:20037/api/Complaints", method: "POST", data: data}).then(function(response){
            alert("Form has been saved successfully.");
            window.location = '/#!';
        console.log(response);
        }, function(response){
            console.log(response);
        });
    };
});

app.controller("ComplaintsEditController", function($scope, $http, $routeParams){
    let id = Number($routeParams.id);
    if( id > 0 ){
        $scope.heading = "Edit Complaint - No. " + id;
        $http({url: "http://localhost:20037/api/Complaints/" + id, method: "GET"}).then(function(response){
            $scope.data = response.data;
            $scope.FullName = $scope.data.fullName;
            $scope.EmailAddress = $scope.data.emailAddress;
            $scope.PhoneNumber = $scope.data.phoneNumber;
            $scope.ResidentialAddress = $scope.data.residentialAddress;
            $scope.Description = $scope.data.description;
            $scope.Status = $scope.data.status;
        }, function(response){
            console.log(response);
        });
        $scope.submit = function(){
            console.log($scope);
            var data = {
                "Id": id,
                "FullName": $scope.FullName,
                "EmailAddress": $scope.EmailAddress,
                "PhoneNumber": $scope.PhoneNumber,
                "ResidentialAddress": $scope.ResidentialAddress,
                "Description": $scope.Description,
                "Status": $scope.Status
            };
            console.log(data);
            $http({url: "http://localhost:20037/api/Complaints/" + id, method: "PUT", data: data}).then(function(response){
                alert("Changes has been saved successfully.");
                window.location = '/#!';
                console.log(response);
            }, function(response){
                console.log(response);
            });
        };      
    }
});