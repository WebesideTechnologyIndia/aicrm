import { useState } from 'react';
import { Volume2, Play, Download, Loader2 } from 'lucide-react';

const TextToSpeech = () => {
  const [activeTab, setActiveTab] = useState('websocket');
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('21m00Tcm4TlvDq8ikWAM');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const tabs = [
    { id: 'websocket', label: 'WebSocket' },
    { id: 'multi-contest', label: 'Multi-Contest WebSocket' },
    { id: 'create', label: 'Create Speech' },
    { id: 'create-timings', label: 'Create with Timings' },
    { id: 'stream', label: 'Stream Speech' },
    { id: 'stream-timings', label: 'Stream with Timings' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // API call logic here based on activeTab
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAudioUrl('https://example.com/audio.mp3');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Volume2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Text To Speech</h1>
              <p className="text-sm text-gray-500">Convert text to natural sounding audio</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-1 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* Common Input */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice ID
                </label>
                <input
                  type="text"
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter voice ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text to Convert
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter the text you want to convert to speech..."
                />
              </div>
            </div>

            {/* Tab Specific Content */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                {tabs.find(t => t.id === activeTab)?.label} Settings
              </h3>
              <p className="text-sm text-gray-500">
                {activeTab === 'websocket' && 'Real-time bidirectional speech generation using WebSocket connection.'}
                {activeTab === 'multi-contest' && 'Handle multiple concurrent WebSocket connections for speech generation.'}
                {activeTab === 'create' && 'Generate complete audio file from text in a single request.'}
                {activeTab === 'create-timings' && 'Generate audio with word-level timing information.'}
                {activeTab === 'stream' && 'Stream audio chunks in real-time as they are generated.'}
                {activeTab === 'stream-timings' && 'Stream audio with timing data for synchronization.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                disabled={!text || loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Generate Speech
                  </>
                )}
              </button>

              {audioUrl && (
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="h-4 w-4" />
                  Download Audio
                </button>
              )}
            </div>

            {/* Audio Player */}
            {audioUrl && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Generated Audio</p>
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;