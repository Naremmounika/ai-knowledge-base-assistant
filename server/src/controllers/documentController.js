import Document from "../models/Document.js";
import DocumentChunk from "../models/DocumentChunk.js";
import { splitIntoChunks } from "../services/chunkService.js";
import { extractText } from "../services/textExtractionService.js";
import fs from "fs";

export const uploadDocument = async (req, res) => {
  try {
    console.log("===== Upload Started =====");
    console.log("File:", req.file);
    console.log("User:", req.user);
    console.log("==========================");
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    const extractedText = await extractText(
    req.file.path,
    req.file.mimetype
  );
  console.log("Extracted Text:");
console.log(extractedText.substring(0, 500));

  const document = await Document.create({
    fileName: req.file.filename,
    originalName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    filePath: req.file.path,
    owner: req.user._id,
    extractedText,
    metadata: {},
  });

   const chunks = splitIntoChunks(extractedText);

  const chunkDocuments = chunks.map((chunk, index) => ({
    document: document._id,
    owner: req.user._id,
    chunkIndex: index,
    content: chunk,
  }));

  await DocumentChunk.insertMany(chunkDocuments);
    console.log("Chunks Created:");
    console.log(chunkDocuments.length);

    console.log("First Chunk:");
    console.log(chunkDocuments[0]);
    res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      document,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Delete file from uploads folder
    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    // Delete document from MongoDB
    await Document.findByIdAndDelete(document._id);

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    res.status(200).json({
      success: true,
      document,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const searchDocuments = async (req, res) => {

    try {

        const { keyword } = req.query;


        if(!keyword){

            return res.status(400).json({
                success:false,
                message:"Search keyword required"
            });

        }


        const documents = await Document.find({

            owner:req.user._id,

            $or:[
                {
                    originalName:{
                        $regex:keyword,
                        $options:"i"
                    }
                },
                {
                    fileType:{
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
            count:documents.length,
            documents

        });



    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};