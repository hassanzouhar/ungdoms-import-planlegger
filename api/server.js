const express = require('express');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: question }],
    });
    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error during OpenAI API call:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

