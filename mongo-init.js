db.createUser({
  user: "kevin",
  pwd: "azerty",
  roles: [
    {
      role: "readWrite",
      db: "mern"
    }
  ]
});
