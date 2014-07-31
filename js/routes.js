(function() {
  angular
    .module('notes-app')
    .config(routes);

  function routes($routeProvider) {
    $routeProvider
      .when('/all', {
        controller: 'NotesListCtrl',
        templateUrl: 'views/list.html'
      })
      .when('/fav', {
        controller: 'FavNotesListCtrl',
        templateUrl: 'views/list.html'
      })
      .when('/new', {
        controller: 'Note',
        controllerAs: 'vm',
        templateUrl: 'views/note.html'
      })
      .when('/edit/:noteId', {
        controller: 'Note',
        controllerAs: 'vm',
        templateUrl: 'views/note.html'
      })
      .otherwise({
        redirectTo: '/all'
      })
    ;
  }
})();
