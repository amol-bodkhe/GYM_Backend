const path=require('path');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const express= require('express');
const cors= require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:4200'],
    credentials: true
  })
);


// Angular build file added here and  setup ther=ir routing here.
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  console.log(">>>> ",express.static(path.join(__dirname, 'public')))
  console.log("TEST baseURL 1",req.baseUrl);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port=process.env.PORT || 5000;
app.get('/', (req, res) => {
  console.log("TEST baseURL 2",req.baseUrl);
  res.send('Server is running');
});

app.use('/api',require('./modules'));

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})