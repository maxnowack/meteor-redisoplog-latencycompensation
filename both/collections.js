import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

const Posts = new Mongo.Collection('posts')
global.Posts = Posts

Meteor.methods({
  createPost(data) {
    return Posts.insert(data)
  }
})

if (Meteor.isServer) {
  Meteor.publish('posts', () => Posts.find())
  Posts.allow({
    insert: () => true,
    update: () => true,
    remove: () => true,
  })
  Posts.deny({
    insert: () => false,
    update: () => false,
    remove: () => false,
  })
}
