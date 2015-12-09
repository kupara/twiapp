var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Twit = mongoose.model('Twit');

//api for all twits

router.route('/twits')
    //creates a new twit
    .post(function(req, res){

        var twit = new Twit();
        twit.t_text = req.body.text;
        twit.twipped_by = req.body.twipped_by;
        twit.save(function(err, twit) {
            if (err){
                return res.send(500, err);
            }
            return res.json(twit);
        });
    })
    //gets all twits
    .get(function(req, res){
		Twit.find(function(err, twits){
			if(err){
				return res.send(500, err);
			}
			return res.send(200,twits);
		});
	});

//twit-specific commands. likely won't be used
router.route('/twits/:id')
    //gets specified twit
    .get(function(req, res){
        Twit.findById(req.params.id, function(err, twit){
            if(err)
                res.send(err);
            res.json(twit);
        });
    }) 
    //updates specified twit
    .put(function(req, res){
        Twit.findById(req.params.id, function(err, twit){
            if(err)
                res.send(err);

            twit.twipped_by = req.body.twipped_by;
            twit.t_text = req.body.text;

            twit.save(function(err, twit){
                if(err)
                    res.send(err);

                res.json(twit);
            });
        });
    })
    //deletes the twit
    .delete(function(req, res) {
        Twit.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });


module.exports = router;