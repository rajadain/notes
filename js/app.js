'use strict';

angular.module('notes-app', ['ngRoute', 'ngStorage'])

  .controller('NotesListCtrl', function($scope, noteService) {
    $scope.notes = noteService.all();

    $scope.removeNote = noteService.del;
  })

  .controller('FavNotesListCtrl', function($scope, noteService) {
    $scope.notes = noteService.all().filter(function(note) { return note.liked });

    $scope.removeNote = noteService.del;
  })

;
