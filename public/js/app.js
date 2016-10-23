angular.module("reportsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    reports: function(reports) {
                        return reports.getreports();
                    }
                }
            })
            .when("/new/report", {
                controller: "NewreportController",
                templateUrl: "report-form.html"
            })
            .when("/report/:reportId", {
                controller: "EditreportController",
                templateUrl: "report.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("reports", function($http) {
        this.getreports = function() {
            return $http.get("/reports").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding reports.");
                });
        }
        this.createreport = function(report) {
            return $http.post("/reports", report).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating report.");
                });
        }
        this.getreport = function(reportId) {
            var url = "/reports/" + reportId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this report.");
                });
        }
        this.editreport = function(report) {
            var url = "/reports/" + report._id;
            console.log(report._id);
            return $http.put(url, report).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this report.");
                    console.log(response);
                });
        }
        this.deletereport = function(reportId) {
            var url = "/reports/" + reportId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this report.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(reports, $scope) {
        $scope.reports = reports.data;
    })
    .controller("NewreportController", function($scope, $location, reports) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.savereport = function(report) {
            reports.createreport(report).then(function(doc) {
                var reportUrl = "/report/" + doc.data._id;
                $location.path(reportUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditreportController", function($scope, $routeParams, reports) {
        reports.getreport($routeParams.reportId).then(function(doc) {
            $scope.report = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.reportFormUrl = "report-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.reportFormUrl = "";
        }

        $scope.savereport = function(report) {
            reports.editreport(report);
            $scope.editMode = false;
            $scope.reportFormUrl = "";
        }

        $scope.deletereport = function(reportId) {
            reports.deletereport(reportId);
        }
    });