const Job = require('../models/job.model.js');
const Question = require("../models/question.model.js");


const AI_API_URl = process.env.AI_API_URl;
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL;


exports.generteQuestions = async(req,res)=>{
  try{
    const {jobId} = req.params;

    const job = await Job.findById(jobId);

    if(!job){
      return res.status(404).json({
        succes: false,
        message:"Job Not Found",
      });
    }

    if(!jobDescription.trim()){
      return res.status(500).json({succes:false,
        message:"AI API_key is not config",
      });
    }

    if(!AI_API_KEY){
      return res.status(500).json({succes:false,
        message:"API_KEY is not found",
      })
    }


    const promot = `You are export technical interview 
    Create Inteview question based only on the following job description.
    JOB title:
    ${job.title || "unknow"}
    
    JOb description
    ${jobDescription}
    
    Create 10 high qulity question based on job description
    
    requirement:
    
    1 Question mmust be relevent to then job description.
    2 Conver technical skills mentioned inthe job description
    3 include practical ad project based question
    4 Do not include answer
    5 Return only valid answer.
    
    JSOn formate:
    {
    "quetions": [
    {
    "question": question text,
    type: technical,
    difficulty:Easy
    }
    ]
    }
    
    Allow technical and coding and projectbased and behvior.
    type Easy/medium/hard `;

    const aiRes = await fetch(AI_API_URl,{
      method:"POST",
      header:{
        Content-Type:"application/json",
        Authrization:`Barer ${AI_API_KEY}`
      },
      body:JSON.stringify(){
        model:AI_MODEL,
        temperature:0.4,
        message:[
          {
          role:"system",
          content:"You genert struture technical interview question",
        },
        {
          role:"user",
          content:promot,
        },
      ],
      },
    });

    const question = await Question.insertMany(
      data.question.map((q,i)=>{
        job:job._id,,
        question:q.question,
        type:q.type,
      })
    )

   
    
    res.status({succes:true,data:questions}) 

  }cache(error){
     res.json({succes:500,
      message:error.message,
    });
  }

}

const createQuestion =async(req,res)=>{
  const count = await Question.countDocuments({
    job:req.params.jobId
  })

  const question = await Question.create({
    job:req.params.jobId,
    question:req.body.question,
    type:req.body.type,
    diffculity:req.body.diffculity,
    order:count+1
  })
return res.json({succes:true,message:question})
};




const updateQuestion =async(req,res)=>{
  const question = await Question.findByIdAndUpdate(req.params{
    question:req.body.question,
    type: req.body.type,
    diffculity:req.body.diffculity
  },
{new:true});
return res.json({succes:true,message:question})
};


const deleteQuestion = async(req,res)=>{
  await Question.findByIdAndDelete(req.params.questionId);

  res.json({succes:true,
    message:"QUestion Delete"
  });
}

const getQuestions = async(req,res)=>{
  const question  = await Question.find({job:req.params.jobId});
  return res.json({succes:true,
    data:questions,
  })
}



model.exports = {
  generteQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions
}




