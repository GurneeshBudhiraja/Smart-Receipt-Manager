import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: fix the type issue
export async function getImageSummary(base64Image: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-exp' });


    const result = await model.generateContent([
      {
        inlineData: {
          // TODO: this will be the base64 image
          data: ``,
          mimeType: "image/jpeg",
        },
      },
      'What do you see in the image in one line',
    ]);

    return result.response.text();

  } catch (error) {
    console.log("Error in getting the image summary", error);
    return null
  }

}