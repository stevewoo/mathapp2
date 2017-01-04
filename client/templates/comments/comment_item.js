Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  },
  image: function() {
    return this.image;
  },
  ownPost: function() {
    return this.userId == Meteor.userId();
  }
});


  