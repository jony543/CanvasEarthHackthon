var express = require('express');
var url = require('url');

var app = express();

app.use('/', express.static('web'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/share', function(res, req){
    var base64Data = req.body.imageData.replace(/^data:image\/png;base64,/, "");

    require('fs').writeFile(req.body.name + ".png", base64Data, 'base64', function(err) {
        console.log(err);
    });
});

// default route
app.use(function(req, res){
    var urlParts = url.parse(req.url);
    var urlQuery = urlParts.search || (urlParts.query) ? '?' + urlParts.query : '';
    res.redirect('/web/' + urlQuery);
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});