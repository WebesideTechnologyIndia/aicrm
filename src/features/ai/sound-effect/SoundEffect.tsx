import { useState } from 'react';
import { Sparkles, Play, Download, Loader2, Volume2, Wand2, Info } from 'lucide-react';

const SoundEffect = () => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [generationInfo, setGenerationInfo] = useState(null);

  const generateSoundEffect = async () => {
    if (!prompt.trim()) {
      alert('Please enter a sound effect description');
      return;
    }

    setIsGenerating(true);
    setAudioUrl(null);
    setGenerationInfo(null);

    try {
      const response = await fetch('/api/ai/sound-effect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          text: prompt.trim(),
          duration_seconds: duration,
          prompt_influence: 0.3
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate sound effect');
      }

      // Get content type to determine if it's audio or JSON with generation info
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // Response includes generation info
        const data = await response.json();
        if (data.audio_base64) {
          // Convert base64 to blob
          const audioData = atob(data.audio_base64);
          const arrayBuffer = new ArrayBuffer(audioData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < audioData.length; i++) {
            view[i] = audioData.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setGenerationInfo(data);
        }
      } else {
        // Direct audio response
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setGenerationInfo({
          prompt,
          duration_seconds: duration,
          generated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error generating sound effect:', error);
      alert(error.message || 'Failed to generate sound effect. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    const filename = prompt.trim().slice(0, 30).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    link.download = `sound-effect-${filename}-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const examplePrompts = [
    'Thunder and lightning storm with heavy rain',
    'Door creaking open slowly in haunted house',
    'Footsteps on wooden floor getting closer',
    'Ocean waves crashing on rocky shore',
    'Birds chirping in peaceful forest morning',
    'Car engine starting and revving',
    'Glass window shattering',
    'Strong wind howling through trees',
    'Crowd cheering and applauding',
    'Fire crackling in fireplace',
    'Phone ringing old style',
    'Sword slashing through air'
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sound Effect Generator</h1>
            <p className="text-gray-600">Create custom sound effects using AI (ElevenLabs)</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              Generate Sound Effect
            </h2>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the sound effect *
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Thunder and lightning storm with heavy rain"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                Be specific and descriptive about the sound you want to create
              </p>
            </div>

            {/* Duration Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration: {duration} second{duration !== 1 ? 's' : ''}
              </label>
              <input
                type="range"
                min="0.5"
                max="22"
                step="0.5"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0.5s (min)</span>
                <span>22s (max)</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Generation takes time</p>
                  <p>Sound effects can take 30-60 seconds to generate. Longer durations take more time.</p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSoundEffect}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating... (this may take a minute)
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Sound Effect
                </>
              )}
            </button>
          </div>

          {/* Example Prompts */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Example Prompts</h3>
            <div className="grid grid-cols-1 gap-2">
              {examplePrompts.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(example)}
                  disabled={isGenerating}
                  className="text-left px-3 py-2 text-sm text-gray-700 bg-white rounded-lg hover:bg-purple-100 hover:text-purple-700 transition-colors border border-transparent hover:border-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-purple-600" />
              Generated Sound
            </h2>

            {!audioUrl && !isGenerating && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No sound effect yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Enter a description and generate
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
                </div>
                <p className="text-gray-700 font-medium">Creating your sound...</p>
                <p className="text-sm text-gray-500 mt-1">
                  This usually takes 30-60 seconds
                </p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="space-y-4">
                {/* Audio Player */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <audio
                    controls
                    src={audioUrl}
                    className="w-full mb-4"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={downloadAudio}
                      className="flex-1 bg-white border-2 border-purple-600 text-purple-600 px-4 py-2.5 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Generation Info */}
                {generationInfo && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Generation Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-gray-600 flex-shrink-0">Prompt:</span>
                        <span className="text-gray-900 text-right">
                          {generationInfo.prompt || prompt}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-gray-900 font-medium">
                          {generationInfo.duration_seconds || duration}s
                        </span>
                      </div>
                      {generationInfo.history_item_id && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID:</span>
                          <span className="text-gray-900 font-mono text-xs">
                            {generationInfo.history_item_id.slice(0, 12)}...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">💡 Best Practices</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Use descriptive language with details about intensity and environment</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Include context: "wooden door creaking" vs just "door"</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Mention speed/rhythm: "fast footsteps" or "slow dripping"</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>3-8 seconds is ideal for most sound effects</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">•</span>
                <span>Be patient - quality sounds take time to generate</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundEffect;