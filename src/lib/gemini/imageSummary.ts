import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// TODO: fix the type issue
export async function getImageSummary(base64Image: string, mimeType: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY);


    const schema = {
      description: "Information about the receipt provided",
      type: SchemaType.OBJECT,
      properties: {
        isValidReceipt: {
          type: SchemaType.BOOLEAN,
          description: "Is the image shown of a valid receipt where the text and items on the receipt are clearly visible?",
          nullable: false,
        },
        date: {
          type: SchemaType.STRING,
          description: "The date the receipt was made. Only the date and not the time.",
          nullable: false,
        },
        tags: {
          type: SchemaType.ARRAY,
          description: "If the receipt is valid, provide a list of tags.  Only 1 tag should be return from the following options: 'Entertainment', 'Groceries', 'Dining out', 'Transportation', 'Housing', 'Utilities', 'Miscellaneous', 'Health'.",
          items: { type: SchemaType.STRING },
          nullable: true,
        },
        price: {
          type: SchemaType.STRING,
          description: "The total sum of the items in the receipt along with the currency symbol used in the receipt (e.g., '$', '€', '¥').",
          nullable: true,
        },
        receiptText: {
          type: SchemaType.STRING,
          description: "A text summarizing each and every thing mentioned in the receipt, including purchased items, date, location, amount, and any other relevant details. Make sure to mention the total amount, select a proper tag from the following options: 'Entertainment', 'Groceries', 'Dining out', 'Transportation', 'Housing', 'Utilites',  'Miscellaneous', 'Health' ",
          nullable: true,
        },
      },
    };

    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash-exp', generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });


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