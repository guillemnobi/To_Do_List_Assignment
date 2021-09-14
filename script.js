$('#create-task').on('submit', function (e) {
  e.preventDefault();
  createTask();
});

$(document).ready(function(){
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todolist').empty(); 
        response.tasks.forEach(function (task) {
          $('#todolist').append('<div class="row"><p class="col-xs-8">- ' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="markcomplete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
        });
      console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  getAndDisplayAllTasks();  
  
  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val(''); 
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });  
  }

  $('#createbutton').on('click', function (e) {
    e.preventDefault();
    createTask();
  });

  $('#todolistadder').on('keypress',function(e) {
    if(e.which == 13) {
    e.preventDefault();
    createTask();
    }
});

  var deleteTask = function (id) {
    $.ajax({
   type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=136',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  var markTaskComplete = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=136',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
   type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=136',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.markcomplete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });



  $('#option1').on('click', function (e) {
    e.preventDefault();
    getAndDisplayAllTasks();
  });

  var getAndDisplayActiveTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todolist').empty(); 
        response.tasks.forEach(function (task) {
          if (task.completed) {
            $('#todolist').append('<div class="row"><p class="col-xs-8">- ' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="markcomplete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');      
          }
        });
      console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  $('#option2').on('click', function (e) {
    e.preventDefault();
    getAndDisplayActiveTasks();
  });

  var getAndDisplayNonActiveTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todolist').empty(); 
        response.tasks.forEach(function (task) {
          if (task.completed === false) {
            $('#todolist').append('<div class="row"><p class="col-xs-8">- ' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="markcomplete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');      
          }
        });
      console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }
  
  $('#option3').on('click', function (e) {
    e.preventDefault();
    getAndDisplayNonActiveTasks();
  });
});





