(function() {
  angular
    .module('notes-app')
    .controller('List', List);

  function List(noteService, listService, $stateParams) {
    var vm = this;

    vm.list  = listService.get($stateParams.listId);
    vm.notes = vm.list.notes();

    vm.remove = remove;

    function remove(id) {
      return noteService.del(id);
    }
  }
})();
