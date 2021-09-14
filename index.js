
console.log("js is working today")


$.ajax({
  type: 'POST',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
  contentType: 'application/json',
  dataType: 'json',
  data: JSON.stringify({
    task: {
      content: 'Do something fun'
    }
  }),
  success: function (response, textStatus) {
    console.log(response);
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});


// $(document).ready(function(){
//   $.ajax({
//     type: 'GET',
//     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1',
//     dataType: 'json',
//     success: function (response, textStatus) {
//         console.log(response);
//     },
//     error: function (request, textStatus, errorMessage) {
//       console.log(errorMessage);
//     }
//   });
// });

// $(document).ready(function(){
//   $.ajax({
//     type: 'GET',
//     url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=136',
//     dataType: 'json',
//     success: function (response, textStatus) {
//       response.tasks.forEach(function (task) {
//         $('#todo-list').append('<p>' + task.content + '</p>');
//       })
//     },
//     error: function (request, textStatus, errorMessage) {
//       console.log(errorMessage);
//     }
//   });
// });