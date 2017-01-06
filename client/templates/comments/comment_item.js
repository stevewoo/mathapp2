Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  image: function() {
    return this.image;
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});


  