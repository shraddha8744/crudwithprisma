const express=require("express");
const { createNotes, getAllNotesByUserId, editNoteByNoteid ,deleteNoteByNoteId} = require("../controllers/notesController");
const { checkAuthorization } = require("../helper/middleware/checkUserAuthorizationMiddleware");
const NoteRouter=express.Router();
NoteRouter.use(checkAuthorization)

NoteRouter.post("/createNote",createNotes)
NoteRouter.get("/getAllNotesByUserId",getAllNotesByUserId)
NoteRouter.put("/update/:id",editNoteByNoteid)
NoteRouter.delete("/delete/:id",deleteNoteByNoteId)



module.exports=NoteRouter