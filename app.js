// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
// const config = require("./config");
// config(app);

const session = require('./config/session.config');
session(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "roles";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
  if (req.session.user) {
    app.locals.username = req.session.user.username;
  } else {
    app.locals.username = null;
  }
  next();
})

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);
const auth = require('./routes/auth.routes');
app.use('/auth', auth);
const post = require('./routes/post.routes');
app.use('/post', post);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
