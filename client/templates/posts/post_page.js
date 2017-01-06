Template.postPage.helpers({
  comments: function() {
  	// var comments = Comments.find({}, {sort: {submitted: 1}}); // sort by date submitted; doesn't show if edited 
  	
  	//var commentsList = Posts.find({postId: this._id}, {'comments':{}}).fetch();
  	var commentsList = Posts.find({"comments.postId": this._id});




  	// var post = Posts.findOne("EL5YzzHPGgb3fbyte");
  	// var commentList = post.comments;
  	// console.log(commentList);
	// return Posts.aggregate({ $match : {"comments": {}}}, { $unwind: "$comments" });

  	//Posts.find({postId: {"$elemMatch": {color: "red"}}}, {"shapes.color":1})
  	//console.log("this id: " + this._id);
  	//console.log("post id: " + {postId});
  	//console.log("comments: " + commentsList[0]);

  	return commentsList;
  }
});

// Template.postPage.helpers({
//   comments: function() {
//     return Comments.find({postId: this._id});
//   }
// });