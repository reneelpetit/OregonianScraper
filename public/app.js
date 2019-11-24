$("#scrapeArticles").on("click", function (event) {
    event.preventDefault();
    console.log("scrape articles button click triggered");

    function printData(data) {
      $("#articles").append(
        "<div class='card-header'>" +
        "<a class='btn btn-primary text-white' href='/save'>" +
        "<i class='far fa-newspaper'></i>" + 
        "Save Article</a>" +
        "<a class='btn btn-primary text-white' href=" + data.articleLink + ">" +
        "<i class='far fa-newspaper'></i>" + 
        "Read Article</a>" +
        "</div>" +

        "<div class='card-body'>" +
        "<blockquote class='blockquote mb-0'>" +
            "<p>Title: " + data.articleTitle + "</p>" +
            "<footer class='blockquote-footer'>" + 
            "Author Name <cite title='Source Title'>" +
            data.articleDate + "</cite></footer>" +
        "</blockquote>" +
        "</div>"
      )
    }
    $.getJSON("/articles", function(data) {
      console.log("/articles data is ", data);
        for (var i = 0; i < data.length; i++) {
          printData(data[i]);
        }
      });
});