Exercises = new Mongo.Collection('exercises');

Meteor.methods({
  exerciseInsert: function(exerciseAttributes) {
    //check(this.userId, String);
    check(exerciseAttributes, {
      postId: String,
      body: String
    });
    
    //var user = Meteor.user();
    var post = Posts.findOne(exerciseAttributes.postId);

    if (!post)
      throw new Meteor.Error('invalid-exercise', 'Exercises must be linked to a post');
    
    // exercise = _.extend(exerciseAttributes, {
    //   userId: user._id,
    //   author: user.username,
    //   submitted: new Date()
    // });
    
    // update the post with the number of comments
    //Posts.update(exercise.postId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    exercise._id = Exercises.insert(exercise);
    
    // now create a notification, informing the user that there's been a comment
    //createCommentNotification(comment);
    
    return exercise._id;
  }
});
