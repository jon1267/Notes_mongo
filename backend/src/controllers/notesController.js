import { json } from 'express';
import Note from '../models/Note.js';

//export async function getAllNotes(req, res) {
export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1}); // -1 => sort DESC
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes function',error);
    res.status(500).json({ message: 'Internal server error'});
  }
};

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    if(!note) {
      res.status(404).json({message: 'Note not found.'});
    }
    res.status(200).json(note)
  } catch (error) {
    console.error('Error in getNoteById function',error);
    res.status(500).json({ message: 'Internal server error'});    
  }
}

export async function createNote(req, res) {
   try {
    const {title, content} = req.body; 
    const note = new Note({title, content});
    const savedNote = await note.save();
    res.status(201).json(savedNote);
   } catch (error) {
    console.error('Error in createNote function',error);
    res.status(500).json({ message: 'Internal server error'});    
   }
};

export async function updateNote(req, res) {
  try {
    const {title, content} = req.body;
    //const id = parseInt(req.params.id); //тут id типа UUID, не целое.

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, 
      {title, content},
      {new: true}
    );

    if(!updatedNote) {
      res.status(404).json({message: 'Note for update not found.'});
    }
    
    res.status(200).json(updatedNote)
  } catch (error) {
    console.error('Error in updateNote function',error);
    res.status(500).json({ message: 'Internal server error'});    
    
  }
};

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if(!deletedNote) {
      res.status(404).json({message: 'Note for deleting not found.'});
    }

    res.status(200).json({message: 'Note was deleted.'});
  } catch (error) {
    console.error('Error in deleteNote function',error);
    res.status(500).json({ message: 'Internal server error'});     
  }
};

