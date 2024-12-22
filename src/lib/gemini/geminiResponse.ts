import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// TODO: fix the type 
export async function generateResponse(userQuestion: string, userHistory, userData): Promise<string | null> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);


    const schema = {
      description: "Information about the receipt provided",
      type: SchemaType.OBJECT,
      properties: {
        isValidQuestion: {
          type: SchemaType.BOOLEAN,
          description: "Is the question asked somehow asks the user about the question related to the user's personal expenditure.",
          nullable: false,
        },
        message: {
          type: SchemaType.STRING,
          description: "If the user has asked question about the personal spending then analyze the provided content and answer the user' question. If the isValidQuestion is false then reply with a friendly message no longer than 2 lines how you can only help answering the questions related to the user's personal spending and finance. If the user do greet you and exchange some informatiion about the user's personal spending, you can reply to that question in a short message.",
          nullable: false,
        },
      },
    };

    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash-exp',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
      systemInstruction: "You are a smart agent whose aim is to provide information regarding about the user's personal spending. You will be given the data to look from so that you do have all the knowledge about the user's spending information. This will be useful for you to give right answers to questions. If there is anything asked beyond this you will reply with a short friendly message, no longer than 2 lines. If the user do ask for some advice regarding the personal spending, finance, bill, etc. give the user a small informational message",
    });

    const chat = model.startChat({
      history: userHistory
    });
    const geminiResponse = await chat.sendMessage(`This is the user data for you to answer questions from: ${userData}. If this is empty array tell user how uploading receipts would personalize the experience. The user is asking the following question based on the above provided information, ${userQuestion}. `);

    return geminiResponse.response.text();

  } catch (error) {
    console.log(error);
    return null;
  }
}