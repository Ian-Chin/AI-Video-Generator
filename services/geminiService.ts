
import { GoogleGenAI } from "@google/genai";

const loadingMessages = [
  "Warming up the AI's creative circuits...",
  "Your request is in the queue...",
  "The AI is dreaming up your video concept...",
  "Sketching the first few frames...",
  "Adding color and motion...",
  "This is a complex scene, rendering details...",
  "Applying cinematic touches...",
  "Almost there, polishing the final cut...",
  "Finalizing and preparing your video for playback...",
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideoFromPrompt = async (
  prompt: string,
  onProgress: (message: string) => void
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable not found.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  onProgress(loadingMessages[0]);
  let operation = await ai.models.generateVideos({
    model: 'veo-2.0-generate-001',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
    },
  });

  let messageIndex = 1;
  while (!operation.done) {
    onProgress(loadingMessages[messageIndex % loadingMessages.length]);
    messageIndex++;
    await delay(10000); // Poll every 10 seconds
    try {
      operation = await ai.operations.getVideosOperation({ operation: operation });
    } catch (error) {
       console.error("Polling failed, retrying...", error);
       // Continue polling even if one check fails
    }
  }

  onProgress('Video generation complete!');

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  
  if (!downloadLink) {
    throw new Error('Video generation failed or no video URI was returned.');
  }

  const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
  
  // Fetch the video as a blob to create a local URL.
  // This is better for performance and avoids exposing the API key in the video src.
  onProgress('Downloading video data...');
  const response = await fetch(finalUrl);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  const videoBlob = await response.blob();
  const videoObjectUrl = URL.createObjectURL(videoBlob);

  return videoObjectUrl;
};
