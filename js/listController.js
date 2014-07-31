(function() {
  angular
    .module('notes-app')
    .controller('List', List);

  function List(noteService, $location) {
    var vm = this;
    vm.isFav = ($location.absUrl().indexOf("fav") > -1);

    vm.notes = getNotes();

    vm.remove = remove;

    function getNotes() {
      if (vm.isFav) {
        return noteService.all().filter(function(note) {
          return note.liked;
        });
      } else {
        return noteService.all();
      }
    }

    function remove(id) {
      return noteService.del(id);
    }
  }
})();
