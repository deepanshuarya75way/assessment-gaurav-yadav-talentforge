const { json } = require('express');
const Job = require('../models/job.model.js');
const QuestionGen  = require("../models/questiongen.model.js");




//To generat question we will used  llm model , instede manully add 
// After generation , wee add into  hr dashboard where all question  see 
// interviewr can edit and update question based on requirment 


//  First , take api key and model from  env file
const AI_API_URl = process.env.AI_API_URl;
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL;



//  Call llm model to generate api question
const generteQuestions = async(req,res)=>{
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
      
      JSON formate:
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

    const aiRes = await fetch(AI_API_URl,
      {
      method:"POST",
      header:{
        Content:"application/json"
        Authrization:`Barer ${AI_API_KEY}`,
      },

      body:JSON.stringify()={
        model:AI_MODEL,
        temperature:0.3,
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
    })
      

    const question = await QuestionGen.insertMany(
      data.question.map((q,i)=>({
        job:job._id,
        question:q.questions,
        type:q.type,
        diffculity:q.diffculity
      })
     )
    ),
    res.status(200).json({succes:true,data:questions}) 
  })catch(error){
     return res.json({succes:500,
      message:error.message,
    });
  }
}


// create question
const createQuestion =async(req,res)=>{
  const count = await QuestionGen.countDocuments({
    job:req.params.jobId
  })

  const question = await QuestionGen.create({
    job:req.params.jobId,
    question:req.body.question,
    type:req.body.type,
    diffculity:req.body.diffculity,
    order:count+1
  })
return res.json({succes:true,message:question})
};



// Update question
const updateQuestion =async(req,res)=>{
  const question = await QuestionGen.findByIdAndUpdate(req.params{
    question:req.body.question,
    type: req.body.type,
    diffculity:req.body.diffculity
  },
{new:true});
return res.json({succes:true,message:question})
};


//Delete question 
const deleteQuestion = async(req,res)=>{
  await QuestionGen.findByIdAndDelete(req.params.questionId);

  res.json({succes:true,
    message:"Question Delete"
  });
}


//Get Question
const getQuestions = async(req,res)=>{
  const question  = await QuestionGen.find({job:req.params.jobId});
  return res.json({succes:true,
    data:question,
  })
}


// export all modules
model.exports = {
  generteQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions
}




