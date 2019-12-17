$("#scrapeArticles").on("click", function (event) {
  event.preventDefault();

  function printData(data) {
    $("#articles").append(
      "<div class='card-header'>" +
      "<a class='btn btn-primary text-white' id='save'>" +
      "<i class='far fa-newspaper'></i>" +
      "Save Article</a>" +
      "<a class='btn btn-primary text-white' id='link' href=" + data.articleLink + ">" +
      "<i class='far fa-newspaper'></i>" +
      "Read Article</a>" +
      "</div>" +

      "<div class='card-body'>" +
      "<blockquote class='blockquote mb-0'>" +
      "<p id = 'title'>Title: " + data.articleTitle + "</p>" +
      "<footer class='blockquote-footer'>" +
      "Date: <cite title='Source Title' id='date'>" +
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

$("#save").on("click", function (event) {
  console.log("save onclick triggered");
  event.preventDefault();
  var title = $(this).$("#title").val();
  console.log("title is ", title);
  $.ajax({
    method: "POST",
    url: "/save",
    data: {
      articleTitle: $(this).$("#title").val(),
      articleDate: $(this).$('#date').val(),
      articleLink: $(this).$("#link").val()
    }
  })
})

$("#saved").on("click", function (event) {
  event.preventDefault();
  function printSaveData(data) {
    $("#card-body").append(
      "<ul>" +
      "<li>" + data.articleTitle + "<button href='addNoteButton' id='"+ data._id + "'>Add Note</button>" +
      "<button id='" + data._id + "'>Remove from Saved</button></li>" +
      "</ul>"
    )
  }
  $.getJSON("/save", function (data) {
    for (let i = 0; i < data.length; i++) {
      printSaveData(data[i]);
    }
  })
})