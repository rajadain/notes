(function() {
  angular
    .module('notes-app')
    .controller('List', List);

  function List(noteService, $stateParams) {
    var vm = this;

    vm.notes = getNotes();

    vm.remove = remove;

    function getNotes() {
      switch ($stateParams.listId) {
        case "all":
          return noteService.all();
          break;
        case "fav":
          return noteService.all().filter(function(note) { return note.liked; });
          break;
        default:
          return null;
      }
    }

    function remove(id) {
      return noteService.del(id);
    }
  }
})();
