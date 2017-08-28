const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://admin:admin@ds159033.mlab.com:59033/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, {
    useMongoClient: true
  })
  .then(function() {
    console.log('connected to db');
  })
  .catch(function(err) {
    console.log('Error:-->' + err);
  });

//Getting all videos
router.get('/videos', function(req, res) {
  console.log('get req to all videos');
  Video.find({})
    .exec(function(err, videos) {
      if (err) {
        console.log('Error while retrieving videos');
      } else {
        res.json(videos);
      }
    })
});

//Getting a particular report
router.get('/videos/:id', function(req, res) {
  console.log('get req to particular video');
  Video.findById(req.params.id)
    .exec(function(err, video) {
      if (err) {
        console.log('Error while retrieving video');
      } else {
        res.json(video);
      }
    })
});


//inserting a new video to db
router.post('/video', function(req, res) {
  console.log('Post a video');
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err, insertedVideo) {
    if (err) {
      console.log('Error while saving video');
    } else {
      res.json(insertedVideo);
    }
  });
});


//updating a video
router.put('/video/:id', function(req, res) {
  console.log('Updating the video');
  Video.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    }
  }, {
    new: true
  }, function(err, updatedVideo) {
    if (err) {
      res.send('Error in updating video');
    } else {
      res.json(updatedVideo);
    }
  })
});

//delete a video 
router.delete('/video/:id', function(req, res) {
  console.log('deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if (err) {
      res.send('Deleting in video');
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;