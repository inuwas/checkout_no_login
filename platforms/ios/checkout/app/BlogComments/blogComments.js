var html = require("ui/html-view");
var dialogsModule = require("ui/dialogs");
var http = require("http");
var observable = require("data/observable").Observable;
var commentLink;
var page;
var context;
var theView;
var source = new observable;
function getRequest(postID){
    
    var yourName = source.name;
    var yourEmail = source.email;
    var yourContent = source.comment;
    var dateVariable = new Date();
    http.request({
        url: "http://localhost/~inuwa/abuapp/wp-json/wp/v2/comments",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
            author:"",
            author_email: yourEmail ,
            author_name: yourName,
            author_url:"",
            content:yourContent,
            date: dateVariable,
            post: postID})
    }).then(function (response) {
        result = response.content.toString();
        console.log(result);
        dialogsModule.alert("Message Sent.");
    }, function (e) {
        console.log("Error occurred " + e);
    });
}

function closeModally(){
    page.closeModal();
}

function sendComments(){
    //Get sendComments
    console.log("post id is: "+ context);
    getRequest(context);
    closeModally();
}

function onShownModally(args) {
    context = args.context;
    closeCallback = args.closeCallback;
    console.log("Post ID is "+context);
}

function pageLoaded(args){
    page = args.object;
    source.name = "Enter your name please";
    source.email ="Enter your email here please";
    source.comment = "Comments go here";
    page.bindingContext = source;
}
exports.onShownModally = onShownModally;
exports.pageLoaded = pageLoaded;
exports.sendComments = sendComments;