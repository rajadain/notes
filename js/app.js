'use strict';

angular.module('notes-app', ['ngRoute'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/all', {
        controller: 'NotesListCtrl',
        templateUrl: 'views/list.html'
      })
      .otherwise({
        redirectTo: '/all'
      });
  })

  .controller('NotesListCtrl', function($scope) {
    $scope.notes = [
      {
        "title": "Sample Note",
        "content": "This is some sample content for this sample note.",
        "created": new Date(1404010593 * 1000),
        "modified": new Date(1404010731 * 1000),
        "liked": false
      }
    ];
  })

;
