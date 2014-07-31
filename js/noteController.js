(function() {
  angular
    .module('notes-app')
    .controller('Note', Note);

  function Note(noteService, $stateParams, $state) {
    var vm = this;
    vm.isNew = ($stateParams.noteId == "new");

    vm.note = getNote();

    vm.save   = save;
    vm.remove = remove;
    vm.cancel = cancel;

    function getNote() {
      if (vm.isNew) {
        return noteService.new();
      } else {
        var currentNote = noteService.get($stateParams.noteId);
        vm.oldNote = noteService.copy(currentNote);
        return currentNote;
      }
    }

    function save() {
      vm.note.modified = new Date();
      if (vm.isNew)
        noteService.add(vm.note);

      $state.go('list', { listId: "all" });
    }

    function remove() {
      if (!vm.isNew)
        noteService.del(vm.note.id);

      $state.go('list', { listId: "all" });
    }

    function cancel() {
      noteService.del(vm.note.id);
      noteService.add(vm.oldNote);

      $state.go('list', { listId: "all" });
    }
  }
})();
