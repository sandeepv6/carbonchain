import Groq from "groq-sdk";

const groq = new Groq();

export async function POST(request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return new Response('No text provided', { status: 400 });
    }

    const chatCompletion = await getGroqChatCompletion(text);
    const content = chatCompletion.choices[0]?.message?.content || "";
    
    // Parse the content as JSON
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(content);
    } catch (error) {
      console.error('Error parsing AI response as JSON:', error);
      jsonResponse = {
        total_reduction: 0,
        percentage_reduction: 0,
        explanation: "Could not parse the document properly"
      };
    }
    
    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in chat completion:', error);
    return new Response(JSON.stringify({
      total_reduction: 0,
      percentage_reduction: 0,
      explanation: "Error processing the document"
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const getGroqChatCompletion = async (text) => {
  return groq.chat.completions.create({
    //
    // Required parameters
    //
    messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
        role: "system",
        content: `You are tasked with calculating the carbon emissions reduction for a theoretical company based on the provided data. The company has implemented measures to reduce carbon emissions, and you need to determine the total reduction in metric tons of CO₂ equivalent (CO₂e) based on the following input data:

        Energy Consumption, Transportation Emissions, Waste Management, Water Usage (related emissions)
        Using this data, calculate:

        The total carbon emissions reduction in metric tons CO₂e.
        The percentage reduction compared to the total emissions before the project.
        Return the answer in a JSON format.
        {total_reduction: [Enter value in metric tons CO₂e], percentage_reduction: [Enter value in percentage], explanation: [Enter explanation]}`,
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: text,
      },
    ],

    // The language model which will generate the completion.
    model: "llama-3.3-70b-versatile",

    //
    // Optional parameters
    //

    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.5,

    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_completion_tokens: 2048,

    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,

    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    stop: null,

    // If set, partial message deltas will be sent.
    stream: false,
  });
};
