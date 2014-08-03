(function() {
  angular
    .module('notes-app')
    .factory('listService', listService);

  function listService(noteService, $localStorage) {
    var lists;

    var listService = {
      get    : getList,
      all    : allLists,
      new    : newList,
      addTo  : addToList,
      delFrom: delFromList,
      del    : delList,
    };

    initialize();
    return listService;

    function initialize() {
      lists = $localStorage.$default({
        lists: [
          {
            id      : "all",
            name    : "All Notes",
            notes   : noteService.all(),
            created : new Date(),
            modified: new Date(),
          },
          {
            id      : "fav",
            name    : "Favorites",
            notes   : noteService.all().filter(function(note) { return note.liked; }),
            created : new Date(),
            modified: new Date(),
          },
        ]
      }).lists;
    }

    function getList(id) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id == id) {
          return lists[i];
        }
      }
      return null;
    }

    function allLists() {
      return lists;
    }

    function newList(id, name) {
      var existingList = getList(id);
      if (existingList == null) {
        var newList = {
          id      : id,
          name    : name,
          notes   : [],
          created : new Date(),
          modified: new Date(),
        };
        lists.push(newList);
        return newList;
      } else {
        return existingList;
      }
    }

    function addToList(listId, noteId) {
      var list = getList(listId);
      var note = noteService.get(noteId);
      if (list != null && note != null) {
        var alreadyInList = false;
        for (var i = 0; i < list.notes.length; i++) {
          if (list.notes[i].id == noteId) {
            alreadyInList = true;
          }
        }
        if (!alreadyInList) {
          list.notes.push(note);
          list.modified = new Date();
          return true;
        }
      }
      return false;
    }

    function delFromList(listId, noteId) {
      var list = getList(listId);
      if (list != null) {
        for (var i = 0; i < list.notes.length; i++) {
          if (list.notes[i].id == noteId) {
            list.notes.splice(i, 1);
            list.modified = new Date();
            return noteService.getNote(noteId);
          }
        }
      }
      return null;
    }

    function delList(id) {
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id == id) {
          var deletedList = getList(id);
          lists.splice(i, 1);
          return deletedList;
        }
      }
      return null;
    }
  }
})();
