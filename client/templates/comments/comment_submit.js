Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

// Template.imageUpload.events({
//   'change #upload-image': function(event, template) {
//     event.preventDefault();

//     let files = $('input.file_bag')[0].files;

//     let options = {
//         folder: "Meteor.userId()",
//         image_metadata: true
//     };

//     Cloudinary.upload(files, options, function(error, result) {
//         console.log(result.public_id);
//     });
// }


// });

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var image = Session.get('photo');

    if(image){
      var imageURL = "http://res.cloudinary.com/stevew275/image/upload/v1483320421/upload_cloud_w5uow4.gif"; // loading gif
      comment = _.extend(comment, {
      image: imageURL
      });
    }

    var errors = {};
    if (!comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }
    
    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
        if(image){ // check if post also includes image
          uploadToCloudinary(commentId, image);
        }
      }
      
    });

    Session.set("photo", null); // get rid of the image just captured
  }
  // 'submit form': function(e, template) {
  //   e.preventDefault();
  //   console.log("hi");

  // }
});


function uploadToCloudinary(commentId, image){

  var files = [];
  files.push(dataURLtoBlob(image));

      let options = {
        folder: "mathApp",
        image_metadata: true
      };

      //var commentProperties = { image: imageURL };

      
      Cloudinary.upload(files, options, function(err, res) {
          if (err){
            console.log("Error: " + err);
            return;
          }
          //console.log(res);
          imageURL = res.secure_url;
          Comments.update(commentId, {$set: {image: imageURL}})
          //console.log(imageURL);
      });
}




Template.commentSubmit.helpers({
  photo: function () {
    return Session.get("photo");
  }
});

Template.commentSubmit.events({
    'click .addImage': function () {
      var cameraOptions = {
        width: 640,
        height: 480
      };

      MeteorCamera.getPicture(cameraOptions, function (error, data) {
        Session.set("photo", data);
      });
    }
  });
