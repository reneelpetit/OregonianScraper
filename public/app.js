$("#scrapeArticles").on("click", function (event) {
    event.preventDefault();
    console.log("scrape articles button click triggered");

    $.getJSON("/articles", function(data) {
      console.log("/articles data is ", data);
        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
      });
});