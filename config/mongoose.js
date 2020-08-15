const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeJsAuth', { useNewUrlParser: true });

//We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//Once our connection opens, our callback will be called. For brevity, let's assume that all following code is within this callback.
db.once('open', function () {
  console.log('connected to the database');
});

module.exports = db;
