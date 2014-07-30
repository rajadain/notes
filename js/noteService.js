(function (){
  angular
    .module('notes-app')
    .factory('noteService', noteService);

  function noteService($localStorage) {
    var notes = init();
    var next  = notes.length || 1;

    var noteService = {
      get: getNote,
      all: allNotes,
      new: newNote,
      add: addNote,
      del: delNote,
    };
    return noteService;

    function init() {
      return $localStorage.$default({
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
    }

    function getNote(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) return notes[i];
      }
      return null;
    }

    function allNotes() {
      return notes;
    }

    function newNote() {
      return {
        id      : next++,
        title   : "",
        content : "",
        created : new Date(),
        modified: new Date(),
        liked   : false,
      };
    }

    function addNote(note) {
      if (getNote(note.id)) {
        // Note already exists
        return false;
      } else {
        notes.push(note);
        return true;
      }
    }

    function delNote(id) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
          var deletedNote = notes[i];
          notes.splice(i, 1);
          return deletedNote;
        }
      }
      return null;
    }
  }
})();
