(function() {
  angular
    .module('notes-app')
    .controller('List', List);

  function List(noteService, listService, $stateParams, $state, $window) {
    var vm = this;

    vm.list  = listService.get($stateParams.listId);
    vm.notes = vm.list.notes();
    vm.canDeleteList = (vm.list.id !== "all" && vm.list.id !== "fav");

    vm.remove = remove;
    vm.deleteList = deleteList;

    function remove(id) {
      return noteService.del(id);
    }

    function deleteList() {
      if ($window.confirm("Are you sure you want to delete " + vm.list.name + "?")) {
        listService.del(vm.list.id);
        $state.go('list', { listId: "all" });
      }
    }
  }
})();
