(function() {
  angular
    .module('notes-app')
    .controller('ListModal', ListModal);

  function ListModal(listService, $modalInstance) {
    var vm = this;

    vm.listId   = "";
    vm.listName = "";
    vm.alerts   = [];

    vm.createNewList = createNewList;
    vm.dismiss       = dismiss;
    vm.closeAlert    = closeAlert;

    function createNewList() {
      if (vm.listId === "" || vm.listName === "") {
        vm.alerts.push({
          type   : 'danger',
          message: 'Please fill in URL and Name of list.',
        });
        return false;
      }

      if (listService.get(vm.listId)) {
        vm.alerts.push({
          type   : 'danger',
          message: 'Another list with the same URL already exists.',
        });
        return false;
      }

      var newList = listService.new(vm.listId, vm.listName);

      $modalInstance.close(newList);
      return true;
    }

    function dismiss() {
      $modalInstance.dismiss('cancel');
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }
  }
})();
