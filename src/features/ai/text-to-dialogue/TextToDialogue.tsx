import { useState, useEffect } from 'react';
import { MessageCircle, Play, Download, Loader2, Plus, X, Users, Clock } from 'lucide-react';

const TextToDialogue = () => {
  const [dialogues, setDialogues] = useState([
    { id: 1, speaker: '', text: '', voiceId: '' }
  ]);
  const [voices, setVoices] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [withTimings, setWithTimings] = useState(false);
  const [loadingVoices, setLoadingVoices] = useState(true);

  // Fetch available voices
  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await fetch('/api/ai/voices', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVoices(data.voices || []);
      }
    } catch (error) {
      console.error('Error fetching voices:', error);
    } finally {
      setLoadingVoices(false);
    }
  };

  const addDialogue = () => {
    const newId = Math.max(...dialogues.map(d => d.id), 0) + 1;
    setDialogues([...dialogues, { id: newId, speaker: '', text: '', voiceId: '' }]);
  };

  const removeDialogue = (id) => {
    if (dialogues.length > 1) {
      setDialogues(dialogues.filter(d => d.id !== id));
    }
  };

  const updateDialogue = (id, field, value) => {
    setDialogues(dialogues.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const generateDialogue = async () => {
    // Validation
    const invalidDialogues = dialogues.filter(d => !d.speaker || !d.text || !d.voiceId);
    if (invalidDialogues.length > 0) {
      alert('Please fill in all dialogue fields (speaker name, text, and voice)');
      return;
    }

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const endpoint = withTimings 
        ? '/api/ai/text-to-dialogue/with-timings'
        : '/api/ai/text-to-dialogue';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          dialogues: dialogues.map(d => ({
            speaker: d.speaker,
            text: d.text,
            voice_id: d.voiceId
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate dialogue');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error generating dialogue:', error);
      alert('Failed to generate dialogue. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `dialogue-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exampleDialogues = [
    {
      speaker: "Customer",
      text: "Hello, I'm interested in buying a property in this area.",
      emotion: "Curious"
    },
    {
      speaker: "Agent",
      text: "Great! We have several excellent properties available. What's your budget?",
      emotion: "Professional"
    },
    {
      speaker: "Customer",
      text: "Around 50 lakhs. Do you have anything with 3 bedrooms?",
      emotion: "Interested"
    }
  ];

  const loadExample = () => {
    setDialogues(exampleDialogues.map((d, idx) => ({
      id: idx + 1,
      speaker: d.speaker,
      text: d.text,
      voiceId: voices[idx % voices.length]?.voice_id || ''
    })));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Text to Dialogue</h1>
              <p className="text-gray-600">Create multi-speaker conversations with AI voices</p>
            </div>
          </div>
          
          {voices.length > 0 && (
            <button
              onClick={loadExample}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Load Example
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Dialogue Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Dialogue Script
              </h2>
              <button
                onClick={addDialogue}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Line
              </button>
            </div>

            {/* Dialogue Lines */}
            <div className="space-y-4">
              {dialogues.map((dialogue, index) => (
                <div key={dialogue.id} className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {/* Remove Button */}
                  {dialogues.length > 1 && (
                    <button
                      onClick={() => removeDialogue(dialogue.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Line {index + 1} - Speaker Name
                    </label>
                    <input
                      type="text"
                      value={dialogue.speaker}
                      onChange={(e) => updateDialogue(dialogue.id, 'speaker', e.target.value)}
                      placeholder="e.g., Customer, Agent, Manager"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Voice
                    </label>
                    {loadingVoices ? (
                      <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500">
                        Loading voices...
                      </div>
                    ) : (
                      <select
                        value={dialogue.voiceId}
                        onChange={(e) => updateDialogue(dialogue.id, 'voiceId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select a voice</option>
                        {voices.map((voice) => (
                          <option key={voice.voice_id} value={voice.voice_id}>
                            {voice.name} - {voice.labels?.gender || 'Unknown'} ({voice.labels?.age || 'N/A'})
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Dialogue Text
                    </label>
                    <textarea
                      value={dialogue.text}
                      onChange={(e) => updateDialogue(dialogue.id, 'text', e.target.value)}
                      placeholder="Enter what this speaker says..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Options */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withTimings}
                    onChange={(e) => setWithTimings(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Include timestamp information
                  </span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateDialogue}
              disabled={isGenerating || dialogues.some(d => !d.speaker || !d.text || !d.voiceId)}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Dialogue...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Generate Dialogue
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview & Output Section */}
        <div className="space-y-6">
          {/* Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Play className="h-5 w-5 text-blue-600" />
              Generated Audio
            </h2>

            {!audioUrl && !isGenerating && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500">No dialogue generated yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Create your dialogue script and generate
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                </div>
                <p className="text-gray-700 font-medium">Generating dialogue...</p>
                <p className="text-sm text-gray-500 mt-1">
                  Processing {dialogues.length} speaker{dialogues.length > 1 ? 's' : ''}
                </p>
              </div>
            )}

            {audioUrl && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <audio
                    controls
                    src={audioUrl}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                <button
                  onClick={downloadAudio}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Audio
                </button>

                {/* Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Speakers:</span>
                      <span className="text-gray-900 font-medium">{dialogues.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">With Timings:</span>
                      <span className="text-gray-900 font-medium">{withTimings ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span>•</span>
                <span>Choose different voices for each speaker</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Keep dialogue natural and conversational</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Add pauses with commas and periods</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Use timings for subtitle generation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToDialogue;