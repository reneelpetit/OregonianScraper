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
  console.log("save onclick triggered");
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

$(".addNote").on('click', function(event) {
  $.ajax({
    method: 'POST',
    url: "/note",
    data: {
      _id: $(this).data('id')
    }
  })
})