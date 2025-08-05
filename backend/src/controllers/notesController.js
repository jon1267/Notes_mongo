import Note from '../models/Note.js';

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes function',error);
    res.status(500).json({ message: 'Internal server error'});
  }
};

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

//time 1:13:20 / 3:34:54
export function updateNote(req, res) {
  res.status(201).json({message: 'Note updated successfully.'});
};

export function deleteNote(req, res) {
  res.status(201).json({message: 'Note was deleted.'});
};

