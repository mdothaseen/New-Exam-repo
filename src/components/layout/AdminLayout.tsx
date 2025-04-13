import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from "@/components/ui/toaster";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from '@/components/ui/sidebar';
import { MessageSquare, X, Send, Sparkles, Bot, User, ImagePlus, ArrowDown, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const isMobile = useIsMobile();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      type: 'bot', 
      message: 'Hello! I\'m the Cee Vision Support Assistant. How can I help you today?', 
      timestamp: new Date().toISOString() 
    },
    { 
      type: 'bot', 
      message: 'I can assist with exam platform queries, technical support, and more.', 
      timestamp: new Date().toISOString(),
      suggestions: ['Exam Scheduling', 'Result Analysis', 'Technical Support', 'Settings Help']
    }
  ]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Reference for chat messages container
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim() === '') return;
    
    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      { type: 'user', message: chatMessage, timestamp: new Date().toISOString() }
    ]);
    
    // Clear input
    setChatMessage('');
    
    // Get response based on user query
    const lowerCaseMessage = chatMessage.toLowerCase();
    let botResponse = `I'm processing your request about "${chatMessage}". Let me know how else I can assist you.`;
    let suggestions = undefined;
    
    // Specific responses based on keywords
    if (lowerCaseMessage.includes('exam') || lowerCaseMessage.includes('schedule')) {
      botResponse = "To schedule an exam, go to the Schedule Exam page from the sidebar. You can set the date, time, duration, and assign candidates. Each exam can be configured with different security settings like proctoring level and allowed materials.";
      suggestions = ['Security Settings', 'Assign Candidates', 'View Scheduled Exams'];
    } else if (lowerCaseMessage.includes('result') || lowerCaseMessage.includes('score')) {
      botResponse = "Exam results can be accessed from the Results page. You can view individual candidate performances, download detailed reports, or view aggregated analytics by exam or department.";
      suggestions = ['Download Reports', 'Analytics Dashboard', 'Individual Results'];
    } else if (lowerCaseMessage.includes('security') || lowerCaseMessage.includes('password')) {
      botResponse = "Our platform offers robust security features including password policies, two-factor authentication, and role-based permissions. You can configure these from the Security tab in Settings.";
      suggestions = ['Password Policies', 'Two-Factor Auth', 'User Permissions'];
    } else if (lowerCaseMessage.includes('setting')) {
      botResponse = "The Settings page allows you to configure platform preferences, security policies, notifications, and user permissions. Any changes you make will be highlighted as 'Unsaved Changes' until you save them.";
      suggestions = ['General Settings', 'Security Settings', 'Notifications'];
    } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('support')) {
      botResponse = "For additional support, you can contact our team at support@ceevision.com or call +91 8006685100. Our support team is available Monday to Friday, 9 AM to 6 PM IST.";
      suggestions = ['Email Support', 'Phone Support', 'Documentation'];
    }
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { 
          type: 'bot', 
          message: botResponse, 
          timestamp: new Date().toISOString(),
          suggestions: suggestions
        }
      ]);
      scrollToBottom();
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      { type: 'user', message: suggestion, timestamp: new Date().toISOString() }
    ]);
    
    // Response based on suggestion
    let botResponse = `Here's information about "${suggestion}". Let me know if you need more specific details.`;
    let suggestions = undefined;
    
    // Specific responses for suggestions
    switch(suggestion) {
      case 'Exam Scheduling':
        botResponse = "The exam scheduling feature allows you to create and manage exams. You can set the date, time, duration, and assign candidates. Each exam can have customized settings for proctoring and security.";
        suggestions = ['Create New Exam', 'Modify Existing Exam', 'Bulk Scheduling'];
        break;
      case 'Result Analysis':
        botResponse = "Our result analysis tools provide detailed insights into candidate performance. You can view individual scores, question-level analytics, and generate custom reports for departments or organizations.";
        suggestions = ['Score Distribution', 'Performance Trends', 'Export Options'];
        break;
      case 'Technical Support':
        botResponse = "For technical issues, our support team is available at support@ceevision.com. Common issues like browser compatibility, login problems, or exam access can often be resolved through our troubleshooting guide.";
        suggestions = ['Browser Issues', 'Login Problems', 'Contact Support Team'];
        break;
      case 'General Settings':
        botResponse = "General settings include platform name, admin email, contact number, timezone, date format, automated reports, and maintenance mode options. Changes are highlighted until saved.";
        suggestions = ['Platform Branding', 'Time Settings', 'Maintenance Mode'];
        break;
      case 'Security Settings':
        botResponse = "Security settings allow you to configure password policies, two-factor authentication, session timeouts, IP restrictions, and password expiry rules to ensure platform security.";
        suggestions = ['Password Policies', 'Two-Factor Auth', 'IP Restrictions'];
        break;
      case 'Notifications':
        botResponse = "You can customize email and in-app notifications for exam schedules, result publications, security alerts, and system updates through the Notifications settings.";
        suggestions = ['Email Notifications', 'Alert Preferences', 'Custom Templates'];
        break;
      default:
        suggestions = ['Contact Support', 'View Documentation', 'Report Issue'];
    }
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { 
          type: 'bot', 
          message: botResponse, 
          timestamp: new Date().toISOString(),
          suggestions: suggestions
        }
      ]);
      scrollToBottom();
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll in chat window
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Show scroll button if not at bottom
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full relative">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
            {children}
          </main>
          <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
            Cee Vision Technology Pvt. Ltd. &copy; {new Date().getFullYear()}
          </footer>
          <Toaster />
        </div>

        {/* AI Chatbot - positioned absolutely */}
        <div className="fixed bottom-6 right-6 z-[1000]">
          {isChatOpen ? (
            <div className="bg-white rounded-xl shadow-2xl w-[350px] md:w-[420px] h-[550px] flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-right duration-300">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-skill-blue to-purple-600 p-4 text-white flex justify-between items-center">
                <h3 className="font-medium flex items-center text-lg">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-300" />
                  Team Cee Vision Support
                </h3>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white h-8 w-8 hover:bg-white/20 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Chat Messages */}
              <div 
                className="flex-1 overflow-auto p-4 bg-gray-50/80 space-y-4" 
                onScroll={handleScroll}
              >
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                    <div className={`max-w-[80%] ${chat.type === 'user' ? 'order-2' : 'order-2'}`}>
                      <div className="flex items-start gap-2">
                        {chat.type === 'bot' && (
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-skill-blue to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            chat.type === 'user' 
                              ? 'bg-gradient-to-r from-skill-blue to-purple-600 text-white' 
                              : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                          }`}>
                            <p className="text-sm font-normal leading-relaxed">{chat.message}</p>
                          </div>
                          <div className={`text-xs mt-1 text-gray-500 ${chat.type === 'user' ? 'text-right mr-1' : 'ml-1'}`}>
                            {formatTime(chat.timestamp)}
                          </div>
                        </div>
                        {chat.type === 'user' && (
                          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Suggestion chips */}
                      {chat.type === 'bot' && chat.suggestions && (
                        <div className="mt-2 ml-10 flex flex-wrap gap-2">
                          {chat.suggestions.map((suggestion, i) => (
                            <button 
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="bg-white text-skill-blue px-3 py-1.5 rounded-full text-xs border border-skill-blue/30 hover:bg-skill-blue/10 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Scroll to bottom button */}
              {showScrollButton && (
                <button 
                  onClick={scrollToBottom}
                  className="absolute bottom-[76px] right-4 bg-white text-skill-blue p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              )}
              
              {/* Chat Input */}
              <div className="p-3 border-t bg-white">
                <div className="flex items-center rounded-lg border border-gray-300 bg-white focus-within:border-skill-blue focus-within:ring-1 focus-within:ring-skill-blue">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-l-lg">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..." 
                    className="flex-1 p-3 focus:outline-none text-sm"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!chatMessage.trim()}
                    className={`m-1 rounded-lg px-3 py-2 transition-colors ${
                      chatMessage.trim() 
                        ? 'bg-skill-blue hover:bg-skill-blue/90' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-center text-gray-500">
                  Powered by Cee Vision Technology • <span className="text-skill-blue cursor-pointer hover:underline">Contact Support</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-end space-y-2 animate-in slide-in-from-right duration-300">
              <Button 
                onClick={toggleChat} 
                className="h-14 w-14 rounded-full bg-gradient-to-r from-skill-blue to-purple-600 hover:opacity-90 shadow-lg p-0 flex items-center justify-center transition-all duration-300 ease-in-out"
              >
                <MessageSquare className="h-6 w-6 text-white" />
              </Button>
              <div className="bg-white text-skill-blue px-3 py-1.5 rounded-full text-sm font-medium shadow-md border border-gray-200 animate-pulse">
                How can we help?
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
