import Document from "../models/Document.js";
import Chat from "../models/Chat.js";
import DocumentChunk from "../models/DocumentChunk.js";
import { getRelevantChunks } from "../services/retrievalService.js";
import { askGemini } from "../services/geminiService.js";

export const askQuestion = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({
        success: false,
        message: "Document ID and question are required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const chunks = await DocumentChunk.find({
    document: document._id,
    });

    const relevantChunks = getRelevantChunks(
        question,
        chunks
    );
    const context = relevantChunks
        .map(chunk => chunk.content)
        .join("\n\n");

    const answer = await askGemini(
        context,
        question
    );

    const chat = await Chat.create({
      user: req.user._id,
      document: document._id,
      question,
      answer,
    });

    res.status(200).json({
      success: true,
      answer,
      chat,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getChatHistory = async (req, res) => {
  try {
    const { documentId } = req.params;

    const chats = await Chat.find({
      user: req.user._id,
      document: documentId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: chats.length,
      chats,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const searchChats = async(req,res)=>{


try{


const {keyword}=req.query;



if(!keyword){

return res.status(400).json({

success:false,
message:"Search keyword required"

});

}



const chats = await Chat.find({

user:req.user._id,

$or:[

{
question:{
$regex:keyword,
$options:"i"
}
},

{
answer:{
$regex:keyword,
$options:"i"
}
}

]

}).sort({

createdAt:-1

});



res.status(200).json({

success:true,
count:chats.length,
chats

});



}
catch(error){

res.status(500).json({

success:false,
message:error.message

});


}


};