import React from 'react';

interface GeminiTipsProps {
  tips: string;
  isLoading: boolean;
  error: string | null;
}

const GeminiTips: React.FC<GeminiTipsProps> = ({ tips, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="mt-4 text-center text-slate-400">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500 mx-auto"></div>
        <p className="text-sm mt-2">Menganalisa data Anda...</p>
      </div>
    );
  }

  if (error) {
    return <p className="mt-4 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg">{error}</p>;
  }

  if (!tips) {
    return null;
  }

  // Use pre-wrap to respect newlines from Gemini's response
  return (
    <div className="mt-4 text-sm text-slate-300 bg-slate-700/50 p-4 rounded-lg">
      <p style={{ whiteSpace: 'pre-wrap' }}>{tips}</p>
    </div>
  );
};

export default GeminiTips;
