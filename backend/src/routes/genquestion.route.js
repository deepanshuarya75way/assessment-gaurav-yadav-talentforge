const router = require("express").Router();

const{
  getQuestions,
  generteQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestions,
} = require("../controllers/interviewQuestion");


router.post(
  "/jobs/:jobId/questions/gen",generteQuestions
)

router.post(
  "/jobs/:jobId/questions/",getQuestions
)

router.post(
  "/jobs/:jobId/questions/",createQuestion
)
router.put(
  "/question/:questionId",updateQuestion
)
router.delete(
  "/question/:questionId",deleteQuestions
)

module.exports = router;

