'use strict';

angular.module('notes-app', ['ngRoute', 'ngStorage'])

  .config(function($routeProvider) {
    $routeProvider
      .when('/all', {
        controller: 'NotesListCtrl',
        templateUrl: 'views/list.html'
      })
      .when('/new', {
        controller: 'CreateNoteCtrl',
        templateUrl: 'views/note.html'
      })
      .when('/edit/:noteId', {
        controller: 'EditNoteCtrl',
        templateUrl: 'views/note.html'
      })
      .otherwise({
        redirectTo: '/all'
      });
  })

  .controller('NotesListCtrl', function($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
      "notes": [
        {
          "title": "Sample Note",
          "content": "This is some sample content for this sample note.",
          "created": new Date(1404010593 * 1000),
          "modified": new Date(1404010731 * 1000),
          "liked": false
        }
      ]
    });

    $scope.removeNote = function(index) {
      $localStorage.notes.splice(index, 1);
    }
  })

  .controller('CreateNoteCtrl', function($scope, $localStorage, $location) {
    $scope.note = {
      "title": "Note Title",
      "content": "",
      "created": new Date(),
      "modified": new Date(),
      "liked": false
    };

    $scope.saveNote = function() {
      $localStorage.notes.push($scope.note);
      $location.path('/all');
    };

    $scope.removeNote = function() {
      $location.path('/all');
    }
  })

  .controller('EditNoteCtrl', function($scope, $localStorage, $location, $routeParams) {
    $scope.note = $localStorage.notes[$routeParams.noteId];

    $scope.removeNote = function(index) {
      $localStorage.notes.splice(index, 1);
      $location.path('/all');
    }

    $scope.saveNote = function() {
      $location.path('/all');
    };
  })

;
