$(document).ready(function functionName() {
  printAllTodos();

  $('#button-add').click(function(){
    var todoValue = $('#input-add').val();
    createTodo(todoValue);
  });

  $(document).on('click','.delete-todo', function () {
    var buttonDelete =$(this);
    var idTodo = buttonDelete.parent().attr('data-id');
    deleteTodo(idTodo);
  });
});

//creo funzione che legge la mia api

function printAllTodos() {
  $.ajax({
    url:'http://157.230.17.132:3010/todos',
    method:'get',
    success:function(data){
      var todos = data
      // console.log(todos);
      var source = $('#entry-template').html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < todos.length; i++) {
      var todo =  todos[i];
      var context = {
        text: todo.text,
        id: todo.id
      }
      var html = template(context);
      $('ul.todos').append(html);
    }
    },
    error:function () {
      alert('errore');
    }
  });
}

//creo funzione che aggiunge

function createTodo(todoValue) {
  $.ajax({
    url:'http://157.230.17.132:3010/todos',
    method:'post',
    data: {
      text: todoValue
    },
    success:function(data){
      $('ul.todos').html('');
      printAllTodos();
    },
    error:function () {
      alert('errore');
    }
  });
}
//creo funzione che cancella
function deleteTodo(id) {
  $.ajax({
    url:'http://157.230.17.132:3010/todos/'+ id,
    method:'delete',
    success:function(data){
      $('ul.todos').html('');
      printAllTodos();
    },
    error:function () {
      alert('errore');
    }
  });
}
