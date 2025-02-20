import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { MessageSquare, Mic, MicOff, Video, VideoOff, Phone, FileText, Share2, Settings } from 'lucide-react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
}

const Consultation = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = io('http://localhost:3000');

    // Get user media and initialize peer connection
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Initialize peer connection
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStream,
        });

        peer.on('signal', (data) => {
          socketRef.current.emit('signal', { signal: data, roomId: id });
        });

        peer.on('stream', (remoteMediaStream) => {
          setRemoteStream(remoteMediaStream);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteMediaStream;
          }
        });

        peerRef.current = peer;
        setIsConnected(true);
      })
      .catch((err) => {
        console.error('Error accessing media devices:', err);
      });

    return () => {
      // Cleanup
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id]);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!isSharingScreen) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (peerRef.current) {
          const videoTrack = screenStream.getVideoTracks()[0];
          const sender = peerRef.current._senders.find((s: any) => s.track.kind === 'video');
          sender.replaceTrack(videoTrack);
        }
        setIsSharingScreen(true);
      } else {
        if (stream && peerRef.current) {
          const videoTrack = stream.getVideoTracks()[0];
          const sender = peerRef.current._senders.find((s: any) => s.track.kind === 'video');
          sender.replaceTrack(videoTrack);
        }
        setIsSharingScreen(false);
      }
    } catch (err) {
      console.error('Error sharing screen:', err);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: user?.name || 'User',
        text: newMessage,
        timestamp: new Date(),
        type: 'text',
      };
      setMessages([...messages, message]);
      socketRef.current.emit('message', { message, roomId: id });
      setNewMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, implement file upload to a server and get back the URL
      const message: Message = {
        id: Date.now().toString(),
        sender: user?.name || 'User',
        text: `Shared a file: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file), // In production, use actual file URL from server
      };
      setMessages([...messages, message]);
      socketRef.current.emit('message', { message, roomId: id });
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Main video area */}
      <div className="flex-1 bg-gray-900 p-4 relative">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </div>
          </div>
          <div className="relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              Remote User
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${
              isAudioEnabled ? 'bg-blue-600' : 'bg-red-600'
            } text-white hover:opacity-90`}
          >
            {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-blue-600' : 'bg-red-600'
            } text-white hover:opacity-90`}
          >
            {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${
              isSharingScreen ? 'bg-blue-600' : 'bg-gray-600'
            } text-white hover:opacity-90`}
          >
            <Share2 className="h-6 w-6" />
          </button>
          <button
            onClick={() => window.history.back()}
            className="p-4 rounded-full bg-red-600 text-white hover:opacity-90"
          >
            <Phone className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Chat sidebar */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-medium">{message.sender}</span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {message.type === 'text' ? (
                <p className="mt-1 text-gray-700">{message.text}</p>
              ) : (
                <a
                  href={message.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {message.fileName}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
            <div className="flex items-center">
              <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <FileText className="h-4 w-4" />
                <span>Share file</span>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Consultation;