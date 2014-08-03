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
        lists: []
      }).lists;

      // We add a function to each item here because
      // it is not saved in localStorage.
      for (var i = 0; i < lists.length; i++) {
        lists[i].notes = notes;
      }

      var allList = {
        id      : "all",
        name    : "All Notes",
        created : new Date(),
        modified: new Date(),
        notes   : function() {
          // Return all notes.
          return noteService.all();
        },
      };

      var favList = {
        id      : "fav",
        name    : "Favorites",
        created : new Date(),
        modified: new Date(),
        notes   : function() {
          // Return only those notes where note.liked is true
          return noteService.all().filter(
            function(note) {
              return note.liked;
            }
          );
        },
      };

      // Delete and re-add special lists to collection, since otherwise
      // they will have the incorrect notes() function assigned to them.
      delList(allList.id); lists.push(allList);
      delList(favList.id); lists.push(favList);
    }

    function notes() {
      var listId = this.id;
      return noteService.all().filter(
        function(note) {
          for (var j = 0; j < note.lists.length; j++) {
            if (note.lists[j] == listId) {
              return true;
            }
          }
          return false;
        }
      );
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
          created : new Date(),
          modified: new Date(),
          notes   : notes,
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
        for (var i = 0; i < note.lists.length; i++) {
          if (note.lists[i] == list.id) {
            alreadyInList = true;
          }
        }
        if (!alreadyInList) {
          note.lists.push(list.id);
          note.modified = new Date();
        }
        return true;
      }
      return false;
    }

    function delFromList(listId, noteId) {
      var note = noteService.get(noteId);
      if (note != null) {
        for (var i = 0; i < note.lists.length; i++) {
          if (note.lists[i] == listId) {
            note.lists.splice(i, 1);
            note.modified = new Date();
            return note;
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
