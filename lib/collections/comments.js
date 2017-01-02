Comments = new Mongo.Collection('comments'); // var comments?

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);

    check(commentAttributes, {
      postId: String,
      body: String,
      image: Match.Maybe(String) // optional, but if exists should be URL

    });
    
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    // update the post with the number of comments
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    
    return comment._id;
  }
  // commentUpdate: function(commentAttributes){

  //   Comments.update(currentPostId, {$set: postProperties}, function(error) {
  //     if (error) {
  //       // display the error to the user
  //       throwError(error.reason);
  //     } else {
  //       Router.go('postPage', {_id: currentPostId});
  //     }
  //   });


  // }



});
