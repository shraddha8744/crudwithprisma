const express=require("express")
const authRouter = require("./authRoute")
const NoteRouter = require("./notesRoute")
const router=express.Router()

router.use("/user",authRouter)
router.use("/notes",NoteRouter)
module.exports=router