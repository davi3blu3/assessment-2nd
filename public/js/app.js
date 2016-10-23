angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    reports: function(Reports) {
                        return Reports.getReports();
                    }
                }
            })
            .when("/new/report", {
                controller: "NewReportController",
                templateUrl: "report-form.html"
            })
            .when("/report/:reportId", {
                controller: "EditReportController",
                templateUrl: "report.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Reports", function($http) {
        this.getReports = function() {
            return $http.get("/reports").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding reports.");
                });
        }
        this.createReport = function(report) {
            return $http.post("/reports", report).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating report.");
                });
        }
        this.getReport = function(reportId) {
            var url = "/reports/" + reportId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this report.");
                });
        }
        this.editReport = function(report) {
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
        this.deleteReport = function(reportId) {
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
    .controller("ListController", function(contacts, $scope) {
        $scope.contacts = contacts.data;
    })
    .controller("NewContactController", function($scope, $location, Contacts) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveContact = function(contact) {
            Contacts.createContact(contact).then(function(doc) {
                var contactUrl = "/contact/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditContactController", function($scope, $routeParams, Contacts) {
        Contacts.getContact($routeParams.contactId).then(function(doc) {
            $scope.contact = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "contact-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveContact = function(contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteContact = function(contactId) {
            Contacts.deleteContact(contactId);
        }
    });