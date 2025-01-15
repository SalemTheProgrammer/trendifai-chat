"use client";

import { useState, useCallback, useEffect } from 'react';

export function useVoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(chunks => [...chunks, e.data]);
        }
      };

      recorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        try {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.webm');
          
          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error('Transcription failed');
          }
          
          const data = await response.json();
          setTranscript(data.text);
        } catch (error) {
          console.error('Transcription error:', error);
        } finally {
          setIsProcessing(false);
          setAudioChunks([]);
        }
      };

      setMediaRecorder(recorder);
      recorder.start(1000); // Record in 1-second chunks
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [audioChunks]);

  const stopListening = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsListening(false);
    }
  }, [mediaRecorder]);

  return {
    isListening,
    startListening,
    stopListening,
    transcript,
    isProcessing
  };
} 