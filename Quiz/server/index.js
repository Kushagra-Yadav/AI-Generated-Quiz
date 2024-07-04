const express = require("express");
const connectToMongoDB = require("./db/connectToMongoDB");
const dotenv = require("dotenv");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable

const Quiz = require("../server/models/Quiz.model.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.post('/api/chatgpt', async (req, res) => {
  const { formData } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

  try {
    let model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Or your appropriate model
    });

     // Construct the prompt dynamically based on formData
     let prompt = `In JSON, Generate quiz questions based on the following data with fields provided without any Unexpected non-whitespace characte:\n`;
     prompt += JSON.stringify(formData, null, 2); // Convert formData to a properly formatted JSON string
     console.log("Prompt: " + prompt);
 
     let result = await model.generateContent(prompt);
     result = result.response.text(); // Extract the text from the response
     
     // Log the raw result to inspect its structure
     console.log("Raw Generated Result: ", result);
 
     // Extract JSON content from the generated result
     const jsonStart = result.indexOf('{');
     const jsonEnd = result.lastIndexOf('}') + 1;
     
     if (jsonStart === -1 || jsonEnd === -1) {
       throw new Error('Unable to find JSON content in the generated result');
     }
     
     let jsonContent = result.substring(jsonStart, jsonEnd);
     console.log("Extracted JSON Content: ", jsonContent); // Log cleaned result for inspection
 
     // Try parsing the cleaned result as JSON
     let parsedResult;
     try {
       parsedResult = JSON.parse(jsonContent);
       console.log(parsedResult);
     } catch (error) {
       console.error('Error parsing generated result:', error);
       return res.status(500).send('Error parsing generated result as JSON');
     }
    // Store the quiz object in the database
    const newQuiz = new Quiz({
      numberOfQuestions: formData.numberOfQuestions,
      subject: formData.subject,
      difficulty: formData.difficulty,
      hours: formData.hours,
      minutes: formData.minutes,
      topics: formData.topics,
      generatedQuiz: parsedResult, // Store the parsed JSON object
    });

    console.log('Saving new quiz:', newQuiz);

    // Save the quiz object to the database
    await newQuiz.save();

    // Respond with the saved quiz object
    res.json({ result: newQuiz });

  } catch (error) {
    console.error('Error in communicating with OpenAI or saving quiz:', error);
    res.status(500).send('Error in communicating with OpenAI or saving quiz');
  }
});
app.get('/api/getAllQuizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find(); // Assuming Quiz is your MongoDB model
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
const mongoose = require('mongoose'); // Ensure mongoose is required

app.get('/api/getQuiz/:quizCode', async (req, res) => {
  try {
    console.log(req.params);
    const { quizCode } = req.params;
    console.log("Quiz code:", quizCode);

    // Check if quizCode is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(quizCode)) {
      return res.status(400).send({ message: 'Invalid quiz code' });
    }

    const quiz = await Quiz.findById(quizCode);
    console.log("Quiz found:", quiz);

    if (quiz) {
      return res.json(quiz);
    } else {
      res.status(404).send({ message: 'Quiz not found' });
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).send({ message: 'Error fetching quiz data' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectToMongoDB();
    console.log(`Listening at port ${PORT} successfully`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});
