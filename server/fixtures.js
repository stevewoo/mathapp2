// to do:
// - read from Google sheet and update database without breaking links
// - open spreadsheet
// - read in data
// - check post doesn't already exist, if so update it
// - if not add it




// Fixture data 
if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users
  var teacherId = Meteor.users.insert({
    profile: { name: 'Teacher' }
  });
  var teacher = Meteor.users.findOne(teacherId);
 
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  var awsQ1 = Posts.insert({
    title: 'Writing decimal number words as a decimal number',
    userId: sacha._id,
    author: sacha.profile.name,
    //url: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [], votes: 0,
    status: postStatus.Complete,
    exercises: `Worksheet 1: Reading and writing whole numbers 
    Worksheet 3: Reading and writing decimal numbers 
    Assessment Activity Sheets 1 & 2`
  });
  
  var objectiveTemplate = Posts.insert({
    title: "Objective short description",
    userId: sacha._id,
    author: sacha.profile.name,
    added: new Date(now),
    commentsCount: 0,
    status: postStatus.To_do,
    quetionNumber: "1",
    level: "3",
     achievmentObjective: "N2",
     exercises: "worksheets and books",
      onlineResources: "websites",
      image: "if available",
      example: "if available",
      video: "youtube to embed"
  });


  Comments.insert({
    postId: awsQ1,
    userId: teacher._id,
    author: teacher.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });
  
  Comments.insert({
    postId: awsQ1,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });
  
  Posts.insert({
    title: 'Meteor',
    userId: teacher._id,
    author: teacher.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  Posts.insert({
    title: 'The Meteor Book',
    userId: teacher._id,
    author: teacher.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Learning Objective #' + i,
      author: sacha.profile.name,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [], votes: 0,
      status: postStatus.To_do,
      exercises: `Worksheet 1: Reading and writing whole numbers 
    Worksheet 3: Reading and writing decimal numbers 
    Assessment Activity Sheets 1 & 2 number:` +i
    });
  }
}


if (!Meteor.users.findOne({username:"student"})){
    Accounts.createUser({
        username: 'student',
        email: 'myEmail@sdf.xv',
        password: 'password',
        profile: {
            first_name: 'Stu',
            last_name: 'Dent',
            
        }
    });
}

if (!Meteor.users.findOne({username:"teacher"})){
    Accounts.createUser({
        username: 'teacher',
        email: 'teacher@sdfd.sdf',
        password: 'password',
        profile: {
            first_name: 'Tea',
            last_name: 'Cher',
            
        }
    });
}