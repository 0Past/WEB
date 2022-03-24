const express = require('express')
const app = express()
const port = 3000
const request = require('request') //get
const rp = require('request-promise') //post
const cheerio = require('cheerio') //post
var server = require('http').createServer(app)

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}));

app.get('/scoring', function(req, res){
    res.sendFile('/Users/artemteplov/WebstormProjects/scoring/public/index.html');
});



app.post('/scoring', (req, res) => {
    request('http://localhost:8081/hello', (err, response, body)=>{
        console.log(body)
    })

    var options = {
        method : 'POST',
        url : 'http://localhost:8081/main',
        body : req.body,
        json : true
    };
    rp(options)
        .then(function (parsedBody){
            if (parsedBody >= 1.25) res.sendFile('/Users/artemteplov/WebstormProjects/scoring/public/aprove.html');
            else res.sendFile('/Users/artemteplov/WebstormProjects/scoring/public/decline.html');
        })
        .catch(function (err){
            res.send(err);
        })
    console.log(req.body)

})

server.listen(port, function(){
    console.log(`listening on ${port} ... `);
})

