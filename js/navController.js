(function() {
  angular
    .module('notes-app')
    .controller('Nav', Nav);

  function Nav(listService) {
    var vm = this;

    vm.userLists = listService.all().filter(
      function(list) {
        return (list.id != "all" && list.id != "fav");
      }
    );
  }
})();
