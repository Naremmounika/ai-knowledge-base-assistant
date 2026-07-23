import Document from "../models/Document.js";
import Chat from "../models/Chat.js";


export const getDashboard = async(req,res)=>{


try{


const userId = req.user._id;



const totalDocuments = await Document.countDocuments({

owner:userId

});



const totalQuestions = await Chat.countDocuments({

user:userId

});



const recentUploads = await Document.find({

owner:userId

})
.sort({

createdAt:-1

})
.limit(5)
.select(
"originalName fileType createdAt"
);



res.status(200).json({

success:true,

stats:{

totalDocuments,

totalQuestions,

recentUploads

}


});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};