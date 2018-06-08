var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // set our port


var router = express.Router();
router.get('/', function(req, res) {
res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');
mongoose.connect('mongodb://chungc4:Flyingsaucer123@ds139428.mlab.com:39428/firstmongodb')

var Place = require('./place');

// place start
router.route('/place')
    .post(function(req, res) {
        var place = new Place();
        place.name = req.body.name;
        place.description = req.body.description;
        place.country = req.body.country;
        place.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Place created!' });
        });
    })
    .get(function(req, res) {
        Place.find(function(err, place) {
            if (err)
            res.send(err);
            res.json(place);
        });
    });

router.route('/place/:place_id')
    .get(function(req, res) {
        Place.findById(req.params.place_id, function(err, place) {
            if (err)
            res.send(err);
            res.json(place);
        });
    })
    .post(function(req, res) {
        Place.findById(req.params.place_id, function(err, place) {
            if (err)
            res.send(err);
            place.name = req.body.name;
            place.description = req.body.description;
            place.country = req.body.country;
            // save the place
            place.save(function(err) {
                if (err)
                res.send(err);
                res.json({ message: 'Place updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Place.remove({
            _id: req.params.place_id
            }, function(err, place) {
                if (err)
                res.send(err);
                res.json({ message: 'Successfully deleted' });
            });
        });
// place end