const express = require('express')
const mongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3000
var server = require('http').createServer(app)

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.get('/scoring', function(req, res){
    res.sendFile('/Users/artemteplov/WebstormProjects/scoring/public/index.html');
})

app.post('/scoring', (req, res) => {
    console.log(req.body)

    // const url = "mongodb://localhost:3001";
    // const client = new mongoClient(url);

    client.connect(function (err, client){
        const db = client.db('client');
        const collection = db.collection('info')
        let  clientInfo = req.body;
        collection.insertOne(clientInfo, function (err,result){
            if (err){
                console.log(err);
            }
            console.log(result);
            console.log(clientInfo);
            client.close();
        });
        // collection.find( function (err,result){
        //     if (err){
        //         console.log(err);
        //     }
        //     console.log('Base info'+result);
        //     // console.log(clientInfo);
        //     client.close();
        // });
    });

    var grade = 0
    var lifeGrade = 0
    if(req.body.gender === 'female'){
        grade = grade + 0.4
    }

    var age = ((new Date().getTime() - new Date(req.body.birthDate)) / (24 * 3600 * 365.25 * 1000)) | 0;
    var ageGrade = 0
    if (age > 20){
        ageGrade = ageGrade + 0.1 * age
        if (ageGrade > 0.3){
            grade = grade + 0.3
        }else {
            grade = grade + age * 0.1
        }
    }
    lifeGrade = lifeGrade + req.body.periofLife * 0.042
    if (lifeGrade > 0.42){
        grade = grade + 0.42
    }else {
        grade = grade + lifeGrade
    }

    grade = grade + req.body.periodWork * 0.059

    if(req.body.sphere === 'public'){
        grade = grade + 0.21
    }
    if(req.body.profession === 'developer' || req.body.profession === 'teacher'
        || req.body.profession === 'judge' || req.body.profession === 'pilot'){
        grade = grade + 0.55
    }else if (req.body.profession === 'other'){
        grade = grade + 0.19
    }
    if(req.body.bankAccount === 'on'){
        grade = grade + 0.45
    }
    if(req.body.realEstate === 'on'){
        grade = grade + 0.35
    }
    if(req.body.insurencePolice === 'on'){
        grade = grade + 0.19
    }
    if (grade>1.25){
        res.send(`Скоринговая оценка = ${grade} ==> Кредит одобрен`)
    }else{
        res.send(`Скоринговая оценка = ${grade} ==> В кредите отказано`)
    }

})

server.listen(port, function(){
    console.log(`listening on ${port} ... `);
})

