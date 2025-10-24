import axios from 'axios';
import 'regenerator-runtime/runtime';

// ElevenLabs API integration
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Default voice ID (Rachel)

/**
 * Converts text to speech using ElevenLabs API
 * @param {string} text - Text to convert to speech
 * @returns {Promise<ArrayBuffer>} - Audio data as ArrayBuffer
 */
export const textToSpeech = async (text) => {
  if (!ELEVENLABS_API_KEY) {
    console.error('ElevenLabs API key is not set');
    return null;
  }

  try {
    const response = await axios({
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      data: {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    return null;
  }
};

/**
 * Plays audio from ArrayBuffer
 * @param {ArrayBuffer} audioData - Audio data to play
 */
export const playAudio = (audioData) => {
  if (!audioData) return;
  
  const blob = new Blob([audioData], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  
  audio.onended = () => {
    URL.revokeObjectURL(url);
  };
  
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
};

/**
 * Speaks the given text using ElevenLabs
 * @param {string} text - Text to speak
 */
export const speak = async (text) => {
  if (!text) return;
  
  const audioData = await textToSpeech(text);
  if (audioData) {
    playAudio(audioData);
  }
};