const parseQuiz = (generatedQuiz) => {
  const questions = [];
  const lines = generatedQuiz.split('\n').filter(line => line.trim() !== '');

  let currentQuestion = null;
  
  lines.forEach(line => {
    if (line.match(/^\d+\.\s+/)) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = { question: line.replace(/^\d+\.\s+/, ''), options: [] };
    } else if (line.match(/^\s+[a-d]\)/)) {
      if (currentQuestion) {
        currentQuestion.options.push(line.trim());
      }
    }
  });

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
};
module.exports=parseQuiz;