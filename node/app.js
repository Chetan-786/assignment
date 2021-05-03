var express = require('express');
var app = express();
var users = require('./routes/users');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const port = 3000;
const accessTokenSecret = 'youraccesstokensecret';
const { MongoClient } = require('mongodb');
var UserModel = require('./models/Users');

const username = "user";
const pwd = "Password";
app.use(bodyParser.json());
app.use(cors())

const uri = `mongodb://${username}:${pwd}@cluster0-shard-00-00.dgc9q.mongodb.net:27017,cluster0-shard-00-01.dgc9q.mongodb.net:27017,cluster0-shard-00-02.dgc9q.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-10kbcs-shard-0&authSource=admin&retryWrites=true&w=majority`

var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const collections = require(`./collection`);

const routes = (collections) => {
  app.use('/users', users(collections))
}

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("mydb").command({ ping: 1 });
    console.log("Connected successfully to server");
    routes(collections(client));
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post('/login', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Hardcoded user
  const user = {
    username: "Test",
    password: "Test123"
  };

  if (user.username == username && user.password == password) {
    // Generate an access token
    const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

    res.json({
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
});

app.listen(port);