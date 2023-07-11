const {connect, connection} = require('mongoose');

connect('mongodb://127.0.0.1:27017/SocialMedia', {
//   useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});

module.exports = connection;
