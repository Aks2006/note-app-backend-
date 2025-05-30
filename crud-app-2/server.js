const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ('cors');
const notesRoutes = require('./routes/notesRoutes'); //importing routes

const app =express();
const PORT = 6000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/notes', notesRoutes);

// mongo DB connection
mongoose.connect('mongodb://127.0.0.1:27017/notesV2',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('MongoDB Conneted');
    app.listen(PORT, ()=>{
        console.log(`Server running at http://localhost:${PORT}`);

    });
})
.catch (err => console.error('Mongo DB connection error:',err));
