Comments = new Mongo.Collection('comments'); // var comments?

Comments.allow({
  update: function(userId, comment) { return ownsDocument(userId, comment); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
  insert: function (userId, post) { return true; }

  //remove: function(userId, post) { return ownsDocument(userId, post); },
  //insert: function (post) {return true; } // added so I can add posts from main.js
});

// Comments.deny({
//   //update: function(userId, post, fieldNames) {
//     // may only edit the following two fields:
//     return (_.without(fieldNames, 'title').length > 0);
//   }
// });


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
    Posts.update(comment.postId, {$push: {'comments': comment}}, {upsert: true});

    // db.discussion.update(
    // { 'discussion_id': discussion_id },
    // { '$push': { 'comments': {
    //     'posted': datetime.utcnow(),
    //     'author': author_info,
    //     'text': comment_text } } } )

//     db.collection.update(
//     { "_id": ID, "playlists._id": "58"},
//     { "$push": 
//         {"playlists.$.musics": 
//             {
//                 "name": "test name",
//                 "duration": "4.00"
//             }
//         }
//     }
// )
    
    // create the comment, save the id
    //comment._id = Comments.insert(comment);
    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    
    return comment._id;
  },
  commentUpdate: function(commentAttributes){

    Comments.update(currentCommentId, {$set: commentProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
        alert("check this is working: " + currentPostId);
      }
    });


  }

});
