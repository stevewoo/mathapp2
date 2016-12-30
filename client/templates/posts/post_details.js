// Template.postDetails.helpers({ // added
//   exercises: function() {
//     return Exercises.find({postId: this._id}).toString();
//   }
// });

Template.postDetails.helpers({
  exercises: function() {
    return this.exercises;
  }
});