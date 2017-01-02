import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


Cloudinary.config({
  cloud_name: 'stevew275',
  api_key: '883361334217983',
  api_secret: '9K4Bfdkc7fs6B1hpqAPDziZG10A'
});

// CLOUDINARY_URL=cloudinary://883361334217983:9K4Bfdkc7fs6B1hpqAPDziZG10A@stevew275