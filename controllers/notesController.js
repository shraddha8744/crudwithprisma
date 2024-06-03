const prisma = require('../db/config.js');

const createNotes = async (req, res) => {
  const { title, descrption, userId } = req.body;

  // Validate input fields
  if (!title || !descrption || !userId) {
    return res.status(400).json({
      success: false,
      message: "Title, description, and userId are required",
    });
  }

  try {
    // Check if the note with the same title already exists for the same user
    const checkTitle = await prisma.notes.findFirst({
      where: {
        title: title,
        userId: userId,
      },
    });

    if (checkTitle) {
      return res.json({
        success: false,
        message: "Title already exists for this user",
      });
    }

    // Ensure the user exists before creating the note
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create the new note
    const notedata = await prisma.notes.create({
      data: {
        title: title,
        descrption: descrption,
        userId: userId,
      },
    });

    return res.json({
      success: true,
      message: "Note created successfully",
      data: notedata,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the note",
      error: error.message,
    });
  }
};

const getAllNotesByUserId=async(req,res)=>{
  const userId=req.body.userId

  let notes=await prisma.notes.findMany({
    where:{
      userId:userId
    }
  })
  if(notes){
    return res.json({
      success:true,
      message:"all notes",
      data:notes
    })
  }
  else{
    return res.json({
      success:false,
      message:"notes are not found"
    })
  }

}
const editNoteByNoteid=async(req,res)=>{
  const noteId=req.params.id
  const {title,descrption}=req.body
  const updateNote=await prisma.notes.update({
    where:{
      id:Number(noteId)
    },
    data:{
      title:title,
      descrption:descrption


    }
  })
  if(updateNote){
    return res.json({
      success:true,
      message:"note edited successfully",
      updated_data:updateNote
    })
  }
  else{
    return res.json({
      success:false,
      message:"something wrong note is not updated"
    })

  }


}
const deleteNoteByNoteId=async(req,res)=>{
  const noteId= parseInt(req.params.id);
  let deleteNote=await prisma.notes.delete({
    where:{
      id:noteId
    }
  })
  if(deleteNote){
    return  res.json({
      success:true,
      message:"note deleted successfully"
    })
  }
  else{
    return res.json({
      success:false,
      message:"note is not deleted"
    })
  }

}

module.exports = {
   createNotes ,
  getAllNotesByUserId,
  editNoteByNoteid,
  deleteNoteByNoteId
};
