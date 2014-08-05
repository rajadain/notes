(function() {
  angular
    .module('notes-app')
    .controller('Nav', Nav);

  function Nav(listService, $modal, $state) {
    var vm = this;

    vm.userLists = userLists();

    vm.newList = newList;

    function userLists() {
      return listService.all().filter(
        function(list) {
          return (list.id != "all" && list.id != "fav");
        }
      );
    }

    function newList() {
      var listCreateModal = $modal.open({
        templateUrl: 'views/list-modal.html',
        controller: 'ListModal as vm',
      });

      listCreateModal.result.then(success, cancel);

      function success(newList) {
        vm.userLists = userLists();
        $state.go('list', { listId: newList.id });
      }

      function cancel() {}
    }
  }
})();
