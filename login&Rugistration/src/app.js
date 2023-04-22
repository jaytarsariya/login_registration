const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');

const userrouter = require('../router/userRpouter');

const port = 5001;

//database connection
const mongoose = require('mongoose');
const db_url = 'mongodb://127.0.0.1:27017/Form';
mongoose.connect(db_url).then(() => {
  console.log('database connected');
});

// path declaration
const viewpath = path.join(__dirname, '../template/view');
const paserpath = path.join(__dirname, '../template/parser');
const publicpath = path.join(__dirname, '../public');

// hbs.
app.set('view engine', 'hbs');
app.set('views', viewpath);

hbs.registerPartials(paserpath);
app.use(express.static(publicpath));
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', userrouter);

// bcrypt js
// const bcrypt=require("bcryptjs")
// const securePassword = async(password)=>{

//   const passwordHash = await bcrypt.hash(password,10)
//   console.log(passwordHash);

//   const passwordmatch = await bcrypt.compare("jay",passwordHash)
//   console.log(passwordmatch)
// }
// securePassword("jay");

// login check..
app.post('/login', async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await registerHelper.findOne({ email: email });

    const isMatch = await bcrypt.comoare(password, useremail.password);

    if (isMatch) {
      resp.status(201).render('index');
    } else {
      resp.send('invalid password');
    }
  } catch (error) {
    resp.status(400).send('invalid login detils');
  }
});

app.listen(port, () => {
  console.log(`server running on port${port}`);
});
