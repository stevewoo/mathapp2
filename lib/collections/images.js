// Images = new Mongo.Collection('images'); 

// Meteor.methods({
//   imageInsert: function(imageAttributes) {
//     check(this.userId, String);
//     check(imageAttributes, {
//       postId: String,
//       body: String // what should this be?
//     });
    
//     var user = Meteor.user();
//     var post = Posts.findOne(imageAttributes.postId);

//     if (!post)
//       throw new Meteor.Error('invalid-image', 'You must add an image to upload.');
    
//     image = _.extend(commentAttributes, {
//       userId: user._id,
//       author: user.username,
//       submitted: new Date()
//     });
    
//     // update the post with the number of comments
//     // Posts.update(image.postId); // removed , {$inc: {commentsCount: 1}}
    
//     // create the comment, save the id
//     image._id = Images.insert(image);
    
//     // now create a notification, informing the user that there's been a comment
//     // createCommentNotification(comment);
    
//     return image._id;
//   }
// });
