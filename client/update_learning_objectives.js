
var learningObjectives;
var allPosts;
var post; //= [{ title: "myTitle" }];

var teacherId = Meteor.users.insert({ // duplicate! even working?
    profile: { name: 'Teacher' }
  });
var teacher = Meteor.users.findOne(teacherId);


function loadFromSheet() {
  learningObjectives = Tabletop.init( { key: '1XJuZEkm7FUFzuxbZsEAnOK6dTO1n0mNamq2wiW4myGY',
                   callback: afterLoadSheet,
                   simpleSheet: true })
}

function afterLoadSheet(data, tabletop){

	allPosts = tabletop.sheets("test").all();

	//console.log(allPosts);

	for(post of allPosts){

		// check this post isn't already here, if so ignore
		// based on entire post should probably do a unique key

		if(!Posts.findOne(post)){

			post.status = postStatus.To_do;
			post.commentsCount = 0;

			post.userId = teacher._id;
    		post.author = teacher.profile.name;
			
			console.log(post);
			Posts.insert(post);
		}
		else{ // to do: update existing post
			console.log("Post rejected: this post already exists");
		}


		
	}
}

loadFromSheet();


