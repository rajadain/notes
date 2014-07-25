'use strict';

angular.module('notes-app', ['ngRoute', 'ngStorage'])

  .factory('Notes', function($localStorage) {
    var notes = $localStorage.$default({
      notes: [
        {
          id      : 0,
          title   : "Sample Note",
          content : "This is some sample content for this sample note.",
          created : new Date(1404010593 * 1000),
          modified: new Date(1404010731 * 1000),
          liked   : false,
        }
      ]
    }).notes;

    var nextId = notes.length || 1;
    var NoteService = {};

    NoteService.get = function(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) return notes[i];
      }
      return null;
    };

    NoteService.all = function() {
      return notes;
    };

    NoteService.new = function() {
      var thisId = nextId++;
      return {
        id      : thisId,
        title   : "",
        content : "",
        created : new Date(),
        modified: new Date(),
        liked   : false,
      };
    };

    NoteService.add = function(note) {
      if (NoteService.get(note.id)) {
        // Note already exists
        return false;
      } else {
        notes.push(note);
        return true;
      }
    };

    NoteService.del = function(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
          var deletedNote = notes[i];
          notes.splice(i, 1);
          return deletedNote;
        }
      }
      return null;
    };

    return NoteService;
  })

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
      })
    ;
  })

  .controller('NotesListCtrl', function($scope, Notes) {
    $scope.notes = Notes.all();

    $scope.removeNote = Notes.del;
  })

  .controller('CreateNoteCtrl', function($scope, Notes, $location) {
    $scope.note = Notes.new();

    $scope.saveNote = function() {
      Notes.add($scope.note);
      $location.path('/all');
    };

    $scope.removeNote = function() {
      $location.path('/all');
    };
  })

  .controller('EditNoteCtrl', function($scope, Notes, $location, $routeParams) {
    $scope.note = Notes.get($routeParams.noteId);
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
      Notes.del($scope.note.id);
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
