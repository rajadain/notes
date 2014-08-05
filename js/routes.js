(function() {
  angular
    .module('notes-app')
    .config(routes);

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('list', {
        url: '/list/:listId',
        views: {
          ''   : {
            controller: 'List as vm',
            templateUrl: 'views/list.html',
          },
          'nav': {
            controller: 'Nav as vm',
            templateUrl: 'views/nav.html',
          }
        }
      })
      .state('note', {
        url: '/note/:noteId',
        views: {
          ''   : {
            controller: 'Note as vm',
            templateUrl: 'views/note.html',
          },
          'nav': {
            controller: 'Nav as vm',
            templateUrl: 'views/nav.html',
          }
        }
      });

    $urlRouterProvider.otherwise('/list/all');
  }
})();
