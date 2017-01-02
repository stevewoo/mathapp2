Template.commentEdit.onCreated(function() {
  Session.set('commentEditErrors', {});
});

Template.commentEdit.helpers({
  errorMessage: function(field) {
    return Session.get('commentEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentEditErrors')[field] ? 'has-error' : '';
  }
});

Template.commentEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentPostId = this._id;
    
    var commentProperties = {
      // url: $(e.target).find('[name=url]').val(),
      body: $(e.target).find('[name=body]').val()
    }
    
    var errors = validatePost(postProperties);
    if (errors.body)
      return Session.set('commentEditErrors', errors);
    
    Comments.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this comment?")) {
      var currentPostId = this._id;
      Comments.remove(currentPostId);
      Router.go('home');
    }
  }
});
