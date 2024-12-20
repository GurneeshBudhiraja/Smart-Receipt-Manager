import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: fix the type issue
export async function getImageSummary(base64Image: string, mimeType: string) {
  try {
    // Remove this in production
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash-exp' });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType,
        }
      },
      'Explain about this image in one line',
    ]);


    return result.response.text();

  } catch (error) {
    if (error instanceof Error) {

      console.log("Error in getting the image summary", error.message);
      return null
    }
  }

}