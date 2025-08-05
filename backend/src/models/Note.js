import mongoose from 'mongoose';
// time 1:00:41 / 3:34:54

const noteSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },  
}, { timestamps: true } // createdAt, updatedAt
);

const Note = mongoose.model('Note', noteSchema);

export default Note;