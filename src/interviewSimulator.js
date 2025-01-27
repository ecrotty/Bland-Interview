const axios = require('axios');
const logger = require('./utils/logger');
const { BLAND_AI_API_KEY } = process.env;

const API_BASE_URL = 'https://api.bland.ai';

const interviewQuestions = [
  {
    question: "Tell me about yourself and your background.",
    expectedKeywords: ["experience", "skills", "education"]
  },
  {
    question: "What are your strengths and weaknesses?",
    expectedKeywords: ["strength", "weakness", "improvement"]
  },
  {
    question: "Why are you interested in this position?",
    expectedKeywords: ["passion", "growth", "contribution"]
  }
];

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${BLAND_AI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function startInterview(phoneNumber) {
  try {
    const response = await axiosInstance.post('/v1/calls', {
      phone_number: phoneNumber,
      task: 'conduct_interview',
      reduce_latency: true,
      voice: {
        type: "eleven_labs",
        voice_id: "21m00Tcm4TlvDq8ikWAM"
      },
      asr: {
        provider: "deepgram",
        model: "nova-2"
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        temperature: 0.7,
        system_prompt: "You are an AI interviewer conducting a job interview. Ask questions, listen to responses, and provide feedback."
      },
      actions: generateInterviewActions()
    });

    logger.info('Interview started:', response.data);
    return response.data;
  } catch (error) {
    logger.error('Error starting interview:', error);
    throw error;
  }
}

function generateInterviewActions() {
  const actions = [];

  actions.push({
    name: "introduce",
    type: "text_to_speech",
    text: "Hello, I'm your AI interviewer. I'll be asking you a few questions about your background and experience. Let's begin."
  });

  interviewQuestions.forEach((q, index) => {
    actions.push({
      name: `ask_question_${index + 1}`,
      type: "text_to_speech",
      text: q.question
    });

    actions.push({
      name: `listen_response_${index + 1}`,
      type: "speech_recognition"
    });

    actions.push({
      name: `analyze_response_${index + 1}`,
      type: "function",
      function: `
        const response = actions.listen_response_${index + 1}.transcript;
        const keywords = ${JSON.stringify(q.expectedKeywords)};
        const mentionedKeywords = keywords.filter(kw => response.toLowerCase().includes(kw));
        let feedback = "";

        if (mentionedKeywords.length > 0) {
          feedback = "Great! You mentioned key points about " + mentionedKeywords.join(", ") + ". ";
        } else {
          feedback = "Consider mentioning more about " + keywords.join(", ") + " in your response. ";
        }

        return { feedback };
      `
    });

    actions.push({
      name: `provide_feedback_${index + 1}`,
      type: "text_to_speech",
      text: `Thank you for your response. {{analyze_response_${index + 1}.feedback}}`
    });
  });

  actions.push({
    name: "conclude",
    type: "text_to_speech",
    text: "Thank you for participating in this interview simulation. We'll analyze your responses and provide a detailed feedback report soon. Goodbye!"
  });

  return actions;
}

module.exports = {
  startInterview
};
