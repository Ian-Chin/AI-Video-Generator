
import React, { useState, useCallback } from 'react';
import { generateVideoFromPrompt } from './services/geminiService';
import PromptInput from './components/PromptInput';
import LoadingIndicator from './components/LoadingIndicator';
import VideoPlayer from './components/VideoPlayer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateVideo = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    if (!process.env.API_KEY) {
      setError('API_KEY environment variable is not set.');
      return;
    }

    setIsLoading(true);
    setVideoUrl(null);
    setError(null);
    setLoadingMessage('Initializing video generation...');

    try {
      const url = await generateVideoFromPrompt(prompt, setLoadingMessage);
      setVideoUrl(url);
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [prompt]);

  const Header = () => (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        AI Video Generator
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Transform your text prompts into stunning video clips.
      </p>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-700">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerateVideo}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="mt-8 min-h-[400px] flex items-center justify-center bg-gray-900/50 rounded-lg border border-dashed border-gray-600">
            {isLoading ? (
              <LoadingIndicator message={loadingMessage} />
            ) : videoUrl ? (
              <VideoPlayer videoUrl={videoUrl} prompt={prompt} />
            ) : (
              <div className="text-center text-gray-500">
                <p>Your generated video will appear here.</p>
                <p className="text-sm">Enter a prompt and click "Generate" to start.</p>
              </div>
            )}
          </div>
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
