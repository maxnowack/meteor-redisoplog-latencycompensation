import { RedisOplog } from 'meteor/cultofcoders:redis-oplog'

RedisOplog.init({
  mutationDefaults: {
    optimistic: true,
    pushToRedis: true,
  },
})

Accounts.onCreateUser((options, user) => {
  user.profile = { prop: 0 }
  return user;
});
