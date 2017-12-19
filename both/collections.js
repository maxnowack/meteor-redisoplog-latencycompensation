import { Meteor } from 'meteor/meteor'

Meteor.methods({
  updateNested() {
    const user = Meteor.users.findOne({ _id: this.userId })
    const newVal = user.profile.prop + 1
    Meteor.users.update({ _id: this.userId }, { $set: { 'profile.prop': newVal }})
  }
})

if (Meteor.isServer) {
  Meteor.publishWithRedis('posts', () => Posts.find())
}
