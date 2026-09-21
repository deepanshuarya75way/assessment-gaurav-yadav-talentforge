const router = require("express").Router();

const{generateQuestion,
  getQuestions,
  createQues,
  updateQue,
  deleteQues,
  generteQuestions,
} = require("../controllers/interviewQuestion");

router.post(
  "/jobs/:jobId/questions/gen",generteQuestions
)

router.post(
  "/jobs/:jobId/questions/",getQuestions
)

router.post(
  "/jobs/:jobId/questions/",createQues
)
router.put(
  "/question/:questionId",updateQue
)
router.delete(
  "/question/:questionId",deleteQues
)

module.exports = router;

