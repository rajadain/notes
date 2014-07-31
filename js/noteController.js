(function() {
  angular
    .module('notes-app')
    .controller('Note', Note);

  function Note(noteService, $location, $routeParams) {
    var vm = this;
    vm.isEdit = ($location.absUrl().indexOf("edit") > -1);

    vm.note = getNote();

    vm.save   = save;
    vm.remove = remove;
    vm.cancel = cancel;

    function getNote() {
      if (vm.isEdit) {
        var currentNote = noteService.get($routeParams.noteId);
        vm.oldNote = noteService.copy(currentNote);
        return currentNote;
      } else {
        return noteService.new();
      }
    }

    function save() {
      vm.note.modified = new Date();
      if (!vm.isEdit)
        noteService.add(vm.note);

      $location.path('/all');
    }

    function remove() {
      if (vm.isEdit)
        noteService.del(vm.note.id);

      $location.path('/all');
    }

    function cancel() {
      noteService.del(vm.note.id);
      noteService.add(vm.oldNote);

      $location.path('/all');
    }
  }
})();
