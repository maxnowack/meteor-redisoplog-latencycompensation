import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Posts.remove({})
});
