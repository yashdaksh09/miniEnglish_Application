const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function translatePhrase(req, res) {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: `
You are MiniEnglish's natural English coach for Indian mothers.

Convert Hindi or Hinglish into natural spoken English.

The goal is NOT literal translation.

Make the English:
- warm
- natural
- simple
- everyday spoken English
- appropriate for a mother speaking to her child

Return:
1. One main natural English phrase.
2. The tone of the phrase.
3. Two alternative ways to say it.
4. One even more natural and loving version.
5. A simple Hindi equivalent of that loving version.
6. A short explanation of why the better version works.
7. A short mother-friendly mindset tip.

Keep everything easy to understand and speak aloud.

Do not use unnecessary difficult English.
          `,
        },

        {
          role: "user",
          content: text,
        },
      ],

      response_format: {
        type: "json_schema",

        json_schema: {
          name: "translation_result",

          strict: true,

          schema: {
            type: "object",

            properties: {
              naturalEnglish: {
                type: "string",
              },

              tone: {
                type: "string",
              },

              alternatives: {
                type: "array",

                items: {
                  type: "object",

                  properties: {
                    english: {
                      type: "string",
                    },

                    description: {
                      type: "string",
                    },
                  },

                  required: [
                    "english",
                    "description",
                  ],

                  additionalProperties: false,
                },
              },

              evenMoreNatural: {
                type: "string",
              },

              hindiEquivalent: {
                type: "string",
              },

              whyBetter: {
                type: "string",
              },

              mindsetTip: {
                type: "string",
              },
            },

            required: [
              "naturalEnglish",
              "tone",
              "alternatives",
              "evenMoreNatural",
              "hindiEquivalent",
              "whyBetter",
              "mindsetTip",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(
      completion.choices[0].message.content
    );

    res.json(result);
    console.log('Translation API response:', result);
  } catch (error) {
    console.error(
      "Error translating phrase:",
      error
    );

    res.status(500).json({
      message: "Failed to translate phrase",
    });
  }
}

module.exports = {
  translatePhrase,
};