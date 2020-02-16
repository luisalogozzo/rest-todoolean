$(document).ready(function () {

var link = 'http://157.230.17.132:3020/todos';

PrintList(link);


$(document).on('click', '#btn-submit', function () {
  $('#list').html(' ')
  var NewItem = $('#input-insert').val();
  $('#input-insert').val('');
  addItem(link, NewItem);
});


$( "#input-insert").keyup(function() {
 if (event.which == 13) {
   var NewItem = $('#input-insert').val();
   $('#input-insert').val('');
   $('#list').html(' ')
   addItem(link, NewItem);

 }
});

$(document).on('click', '.btn-modify', function () {
  var ThisItem = $(this).siblings().val();
  var ListItemId = $(this).parent().attr("data-id");
  modifyList(link, ListItemId, ThisItem);
});
$(document).on('click', '.btn-delete', function () {
  var ListItemId = $(this).parent().attr("data-id");
  deleteItem(link, ListItemId);
});


});

function PrintList(link) {
  $.ajax({
  url: link,
  method: 'GET',
  success: function (data) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].id);
      var context = {
        id: data[i].id,
        object: data[i].text
       };
       var html = template(context);
       $('#list').append(html)
     }
    }
  });
}

function addItem(link, newItem) {
  $.ajax({
    url: link,
    method: "POST",
    data: {
      text: newItem
    },
    success: function(data) {
      PrintList(link)
    },
    error: function(errore) {
      alert("errore" + errore)
    }
  })
}

function modifyList(link, id, modifiedItem) {
  $.ajax({
    url: link + '/' + id,
    method: 'PATCH',
    data: {
      text: modifiedItem
    },
    success: function() {
      $("#list").empty();
      PrintList(link);
    },
    error: function (error) {
      console.log('errore');
    }

  })
}
function deleteItem(link, id) {
  $.ajax({
    url: link + '/' + id,
    method: 'DELETE',
    success: function() {
      $("#list").empty();
      PrintList(link);
    },
    error: function (error) {
      console.log('errore');
    }

  })
}
