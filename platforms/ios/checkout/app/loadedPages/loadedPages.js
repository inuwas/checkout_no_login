var http = require("http");
var frameModule = require("ui/frame");
var page;
exports.loaded = function (args) {
    page = args.object;
    http.getJSON("http://localhost/~inuwa/abuapp/wp-json/wp/v2/posts?_embed").then(function(response){
        console.log("GOT DATA");
        page.bindingContext = {pageData: response};
    },function(error){
        console.log("Got error");
        console.log("The error is: "+error);
    });
};
exports.onTap = function (args){
    console.log("To the Blog Page");
    var myview = args.view;
    var navigationEntry = {
        moduleName: "BlogPages/blogPage",
        context: { info: myview.bindingContext}

    }
    frameModule.topmost().navigate(navigationEntry);
}