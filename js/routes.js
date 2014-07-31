(function() {
  angular
    .module('notes-app')
    .config(routes);

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list', {
        url: '/list/:listId',
        controller: 'List as vm',
        templateUrl: 'views/list.html'
      })
      .state('note', {
        url: '/note/:noteId',
        controller: 'Note as vm',
        templateUrl: 'views/note.html'
      });

    $urlRouterProvider.otherwise('/list/all');
  }
})();
