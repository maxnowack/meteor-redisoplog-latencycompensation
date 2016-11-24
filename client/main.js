import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const Logs = new Mongo.Collection(null)

Template.posts.helpers({
  posts() {
    return Posts.find()
  },
  logs() {
    return Logs.find().map(entry => entry.title)
  }
});

Template.posts.events({
  'click .insert-post'(event, instance) {
    Meteor.call('createPost', { title: 'new post' })
  },
  'click .insert-post-clientside'(event, instance) {
    Posts.insert({ title: 'new post' })
  },
});

Meteor.subscribe('posts')

Posts.find().observeChanges({
  added(_id) {
    const title = `added post with _id ${_id}`
    console.log(title)
    Logs.insert({ title })
  },
  removed(_id) {
    const title = `removed post with _id ${_id}`
    console.log(title)
    Logs.insert({ title })
  },
})
