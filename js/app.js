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

  .controller('CreateNoteCtrl', function($scope, noteService, $location) {
    $scope.note = noteService.new();

    $scope.saveNote = function() {
      noteService.add($scope.note);
      $location.path('/all');
    };

    $scope.removeNote = function() {
      $location.path('/all');
    };
  })

  .controller('EditNoteCtrl', function($scope, noteService, $location, $routeParams) {
    $scope.note = noteService.get($routeParams.noteId);
    $scope.showCancel = true;
    $scope.oldNote = {
      id      : $scope.note.id,
      title   : $scope.note.title,
      content : $scope.note.content,
      created : $scope.note.created,
      modified: $scope.note.modified,
      liked   : $scope.note.liked,
    };

    $scope.removeNote = function() {
      noteService.del($scope.note.id);
      $location.path('/all');
    };

    $scope.cancelNote = function() {
      $scope.note.id       = $scope.oldNote.id;
      $scope.note.title    = $scope.oldNote.title;
      $scope.note.content  = $scope.oldNote.content;
      $scope.note.created  = $scope.oldNote.created;
      $scope.note.modified = $scope.oldNote.modified;
      $scope.note.liked    = $scope.oldNote.liked;
      $location.path('/all');
    };

    $scope.saveNote = function() {
      $scope.note.modified = new Date();
      $location.path('/all');
    };
  })

;
