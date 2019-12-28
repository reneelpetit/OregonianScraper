$("#scrapeArticles").on("click", function (event) {
  event.preventDefault();

  function printData(data) {
    $("#articles").append(
      "<div class='card-header'>" +
      "<a class='btn btn-primary text-white save' data-title='" + data.articleTitle + "' data-date='" + data.articleDate + "' data-link='" + data.articleLink + "'>" +
      "<i class='far fa-newspaper'></i>" +
      "Save Article</a>" +
      "<a class='btn btn-primary text-white' class='link' href=" + data.articleLink + ">" +
      "<i class='far fa-newspaper'></i>" +
      "Read Article</a>" +
      "</div>" +

      "<div class='card-body'>" +
      "<blockquote class='blockquote mb-0'>" +
      "<p class='title'>Title: " + data.articleTitle + "</p>" +
      "<footer class='blockquote-footer'>" +
      "Date: <cite title='Source Title' class='date'>" +
      data.articleDate + "</cite></footer>" +
      "</blockquote>" +
      "</div>"
    )
  }
  $.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
      printData(data[i]);
    }
  });
});

$("#articles").on("click", ".save", function (event) {
  event.preventDefault();
  var title = $(this).data('title');
  console.log("title is ", title);
  $.ajax({
    method: "POST",
    url: "/save",
    data: {
      articleTitle: $(this).data('title'),
      articleDate: $(this).data('date'),
      articleLink: $(this).data('link')
    }
  })
})

let articleID="";
let articleTitle="";

$(".card-body").on('click', ".addNoteButton", function (event) {
  articleID = event.target.dataset.id;
  articleTitle = event.target.dataset.title;
  $(".card-body").empty();
  $(".savedNote").append(
    "<div class='container border'>" +
    "<h1>Notes for Article</h1>" +
    "<form>" +
    "<div class='form-group'>" +
    "<label for='notesEdit'>Type your notes here</label>" +
    "<input type='input' class='form-control' data='notesEdit' aria-describedby='notes input'" +
    "placeholder='Type your notes here.'>" +
    "<button class='saveNote'>Save changes</button>" +
    "</div>" +
    "</form>" +
    "</div>"
  )
})

$(".savedNote").on('click', ".saveNote", function (event) {
  event.preventDefault();
  let note = ($('.form-control').val());
  $.ajax({
    method: 'POST',
    url: '/note',
    data: {
      articleID: articleID,
      noteBody: note
    }
  })
  .then(function() {
    location.reload();
  })
})

$(".card-body").on('click', ".deleteArticleButton", function (event) {
  articleID = event.target.dataset.id;
  console.log("delete note button clicked, ", articleID);
  $.ajax({
    method: 'DELETE',
    url: '/deletearticle',
    data: {
      articleID: articleID
    }
  })
  .then(function() {
    location.reload();
  })
})