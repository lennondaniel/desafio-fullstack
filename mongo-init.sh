set -e

mongosh <<EOF

db = db.getSiblingDB('tasks')

db.createUser({
  user: 'mongo_user',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'tasks',
    },
  ],
})

EOF