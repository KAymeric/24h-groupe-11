import { AlertCircle, MessageSquare, Send, Shield, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAlertContext } from '../context/AlertContext';
import { mockChatMessages } from '../data/mockData';
import { ChatMessage } from '../types';


const ChatPage = () => {
  const { allZones } = useAlertContext();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedZone, setSelectedZone] = useState('zone1'); // Default to first zone
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = io('http://localhost:5180');
  const userId = Math.random();
  
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Filter messages by selected zone
  const filteredMessages = messages.filter(msg => msg.zoneId === selectedZone);
  
  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      userId: userId.toString(),
      userName: 'Vous',
      zoneId: selectedZone,
      content: newMessage.trim(),
      timestamp: new Date(),
      isOfficial: false,
    };
    socket.emit('message', newMsg);
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  socket.on('message', (message: ChatMessage) => {
    if (message.userId === userId.toString()) return; // Ignore own messages
    message.timestamp = new Date();
    setMessages(prevMessages => [...prevMessages, message]);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="mr-2 text-blue-500" size={28} />
            Chat Local
          </h1>
          <p className="text-gray-600 mt-1">
            Communiquez avec votre communauté pendant les situations d'urgence
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Zone List Sidebar */}
          <div className="bg-gray-50 p-4 border-r">
            <h2 className="font-bold text-lg mb-4">Zones</h2>
            <div className="space-y-2">
              {allZones.map(zone => (
                <button
                  key={zone.id}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                    selectedZone === zone.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedZone(zone.id)}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    zone.riskLevel === 'critical' ? 'bg-red-500' :
                    zone.riskLevel === 'high' ? 'bg-orange-500' :
                    zone.riskLevel === 'medium' ? 'bg-yellow-500' :
                    zone.riskLevel === 'low' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  {zone.name}
                  <span className="ml-auto bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">
                    {messages.filter(msg => msg.zoneId === zone.id).length}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-sm mb-2">À propos du chat</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <div className="flex items-start">
                  <AlertCircle className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <p className="text-yellow-700">
                    Ce chat est réservé aux communications d'urgence. Veuillez respecter les autres utilisateurs et partager uniquement des informations pertinentes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center space-x-2 text-sm mb-2">
                <Shield size={14} className="text-blue-500" />
                <span className="font-medium">Messages officiels</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <User size={14} className="text-gray-500" />
                <span className="font-medium">Messages des utilisateurs</span>
              </div>
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-3 flex flex-col h-[calc(100vh-250px)]">
            {/* Chat Header */}
            <div className="px-4 py-3 border-b flex items-center">
              <h2 className="font-bold">
                {allZones.find(z => z.id === selectedZone)?.name || 'Chat'}
              </h2>
              <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 ml-2">
                {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.userId === 'current-user' ? 'justify-end' : ''}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.isOfficial 
                        ? 'bg-blue-50 border border-blue-200' 
                        : message.userId === 'current-user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center mb-1">
                        {message.isOfficial ? (
                          <Shield size={14} className="text-blue-500 mr-1" />
                        ) : (
                          <User size={14} className={`${message.userId === 'current-user' ? 'text-blue-200' : 'text-gray-500'} mr-1`} />
                        )}
                        <span className={`font-medium text-sm ${
                          message.userId === 'current-user' ? 'text-blue-200' : 
                          message.isOfficial ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {message.userName}
                        </span>
                        <span className={`text-xs ml-2 ${
                          message.userId === 'current-user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className={`${
                        message.userId === 'current-user' ? 'text-white' : 
                        message.isOfficial ? 'text-gray-800' : 'text-gray-800'
                      }`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Aucun message dans cette zone. Soyez le premier à écrire!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className={`ml-2 px-4 py-2 rounded-lg flex items-center ${
                  newMessage.trim() 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={18} className="mr-1" />
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;