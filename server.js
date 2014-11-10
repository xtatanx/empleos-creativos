// application setup

// call packages needed
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Job = require('./app/models/jobs');
var port = process.env.PORT || 3000;
var router = express.Router();
var app = express();
var directory;

mongoose.connect('mongodb://xtatanx:Gonzo009*@linus.mongohq.com:10008/empleos-creativos');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// path for environments
if(app.get('env') === 'development'){
    app.use(express.static(__dirname + '/private'));
    directory = './private/';
}else{
    app.use(express.static(__dirname + '/public'));
    directory = './public/';
}

// routes for the API all routes starting with api/
router.route('/jobs')

    .post(function (req, res){
        var job = new Job();

        job.title = req.body.title;
        job.description = req.body.description;
        job.contactMail = req.body.contactMail;
        job.salary = req.body.salary;
        job.dateCreated = req.body.dateCreated;

        job.save(function (err){
            if(err)
                res.send(err);
            res.json({message: 'job created'});
        });  
    })
    .get(function (req, res){
        Job.find(function (err, jobs){
            if(err)
                res.send(err);
            res.json(jobs);
        });
    });

router.route('/jobs/:job_id')
    // get a job by id
    .get(function (req, res){
        Job.findById(req.params.job_id, function (err, job){
            if(err)
                res.send(err);
            res.json(job);
        });
    })
    // update and job by id
    .put(function (req, res){
        Job.findById(req.params.job_id, function (err, job){
            if(err)
                res.send(err);

            job.title = req.body.title;
            job.description = req.body.description;
            job.contactMail = req.body.contactMail;
            job.salary = req.body.salary;
            job.dateCreated = req.body.dateCreated;
            
            job.save(function (err){
                if(err)
                    res.send(err);
                res.json({message: 'job title updated'});
            }); 
        });
    })
    // update and employ by id
    .delete(function (req, res){
        Job.remove({
            _id: req.params.job_id
        }, function (err, employ){
            if(err)
                res.send(err);
            res.json({message: 'job deleted'});
        });
    });

app.use('/api', router);

// redirect every location to index.html
app.get('*', function (req, res){
    res.sendfile(directory + 'index.html');
});

app.listen(port);
console.log('app runing in port: ', port);
