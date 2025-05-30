const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a Note
router.post('/',async (req,res)=>{
    try{
        const {title, content} =req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch (err){
        res.status(500).json({error: "Note Creation Failed", details: err});
    }
});

// Fetch all notes:
router.get('/', async (req,res)=>{
    try{
        const notes = await Note.find();
        res.json(notes);
    }
    catch (err) {
 res.status(500).json({error: "Failed to fetch notes", details: err});
    }
});

//Update a note
router.put('/:id', async (req, res) => {
try{
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        {title,content},
        {new : true}
    );
    if(!updatedNote){
        return res.status(404).json({message: "Note not found"});
    }
    res.json(updatedNote)
}
catch (error){
    res.status(500).json({message: "Internal Server Error", details: error});
}
});

//Delete a note:
router.delete('/:id', async (req , res)=>{
    try{
        const deletedNote = await Note.findIdAndDelete(
            req.params.id);
            if (!deletedNote){
                return res.status(404).json({message: "Note not found"});
            }
            res.json({message: "Note deleted sucessfully"});
    }
    catch (error){
        res.json(500).json({message: "Internal server Error"});
    }
});

module.exports = router;