var Person = require('./models/Person');

module.exports = function(app){
	app.get('/verify-records', function(req, res){
	    console.log("Retrieve all entries");
        Person.find({},{_id:0, __v:0}, function(err, doc){
            if(!err){
                res.render('records', {
                    records : doc
                })
            }
        });
    });

    app.post('/insertRecord', function(req, res){
        console.log("Request to Insert New record in Database");

        res.header("Access-Control-Allow-Methods", "GET, POST");

        var receivedData = JSON.parse(req.body.userInfo);
        var email;
        if(receivedData.email !=undefined){
            email = receivedData.email.toLowerCase();
        }
        Person.find({email : email}, function(err, doc){
            if(!err && doc.length > 0){
                console.log('Requested Record Exists in the Database');
                res.send("Record Exists");
            }else{
                var person = new Person();
                person.firstName    =   receivedData.firstName;
                person.lastName     =   receivedData.lastName;
                person.email        =   email;
                person.save(function(err, doc){
                    if(err != undefined){
                        res.send(err);
                    }
                    else{
                        res.send(doc);
                    }
                });
            }
        });
    });
}
