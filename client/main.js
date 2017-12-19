import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import './main.html';

const Logs = new Mongo.Collection(null)

Template.posts.helpers({
  loggedIn: () => !!Meteor.userId(),
  user: () => Meteor.user(),
  logs() {
    return Logs.find().map(entry => entry.title)
  }
});

Template.posts.events({
  'click .update'(event, instance) {
    Meteor.call('updateNested')
  },
  'click .create'(event) {
    event.preventDefault()
    Accounts.createUser({
      email: 'test@example.com',
      password: 'test123',
    })
  },
});

Meteor.users.find().observeChanges({
  changed(_id, fields) {
    Logs.insert({ title: `changed: ${JSON.stringify(fields)}` })
  },
})
