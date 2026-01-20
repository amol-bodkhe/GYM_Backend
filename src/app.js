const path=require('path');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const express= require('express');
const app= express();
const cors= require('cors');

app.use(cors());         
app.use(express.json());


// Angular build file added here and  setup ther=ir routing here.
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port=process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api',require('./modules'));

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})