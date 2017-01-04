Template.postPage.helpers({
  comments: function() {
  	var comments = Comments.find({}, {sort: {submitted: 1}}); // sort by date submitted; doesn't show edited 
  	
  	return comments;
  }
});