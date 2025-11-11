import { useState } from 'react';
import { Mic, Upload, Trash2, Loader2, FileAudio, Download } from 'lucide-react';

const SpeechToText = () => {
  const [activeTab, setActiveTab] = useState('transcript');
  const [transcriptId, setTranscriptId] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState(null);

  const tabs = [
    { id: 'transcript', label: 'Get Transcript' },
    { id: 'delete', label: 'Delete Transcript' },
    { id: 'create', label: 'Create Transcript' },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleGetTranscript = async () => {
    if (!transcriptId) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTranscript({
        id: transcriptId,
        text: 'This is a sample transcript of the audio file...',
        duration: 120,
        language: 'en'
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTranscript = async () => {
    if (!transcriptId) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Transcript deleted successfully');
      setTranscriptId('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTranscript = async () => {
    if (!audioFile) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setTranscript({
        id: 'transcript_' + Date.now(),
        text: 'Newly created transcript from the uploaded audio file...',
        duration: 180,
        language: 'en'
      });
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
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mic className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Speech To Text</h1>
              <p className="text-sm text-gray-500">Transcribe audio to text with AI</p>
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
                      ? 'border-green-600 text-green-600'
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
            {/* Get Transcript */}
            {activeTab === 'transcript' && (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transcript ID
                    </label>
                    <input
                      type="text"
                      value={transcriptId}
                      onChange={(e) => setTranscriptId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter transcript ID"
                    />
                  </div>

                  <button
                    onClick={handleGetTranscript}
                    disabled={!transcriptId || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Get Transcript'
                    )}
                  </button>

                  {transcript && activeTab === 'transcript' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-700">Transcript Details</p>
                        <button className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          Export
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ID:</span>
                          <span className="text-gray-900 font-mono">{transcript.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="text-gray-900">{transcript.duration}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Language:</span>
                          <span className="text-gray-900">{transcript.language}</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-900">{transcript.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Delete Transcript */}
            {activeTab === 'delete' && (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      ⚠️ Warning: This action cannot be undone. The transcript will be permanently deleted.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transcript ID
                    </label>
                    <input
                      type="text"
                      value={transcriptId}
                      onChange={(e) => setTranscriptId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter transcript ID to delete"
                    />
                  </div>

                  <button
                    onClick={handleDeleteTranscript}
                    disabled={!transcriptId || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Delete Transcript
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Create Transcript */}
            {activeTab === 'create' && (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Audio File
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="audio-upload"
                      />
                      <label htmlFor="audio-upload" className="cursor-pointer">
                        <FileAudio className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-1">
                          {audioFile ? audioFile.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500">
                          MP3, WAV, M4A up to 25MB
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language (Optional)
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="auto">Auto Detect</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCreateTranscript}
                    disabled={!audioFile || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transcribing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Create Transcript
                      </>
                    )}
                  </button>

                  {transcript && activeTab === 'create' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-medium text-gray-700">Transcript Created</p>
                        <span className="text-xs text-green-600 font-medium">Success</span>
                      </div>
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">ID:</span>
                          <span className="text-gray-900 font-mono">{transcript.id}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded border border-gray-200">
                        <p className="text-sm text-gray-900">{transcript.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;