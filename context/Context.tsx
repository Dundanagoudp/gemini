'use client';

import { createContext, useState, ReactNode, useEffect, useRef } from "react";

interface Message {
  prompt: string;
  response: string;
}

interface ContextType {
  input: string;
  setInput: (value: string) => void;
  recentPrompt: string;
  setRecentPrompt: (value: string) => void;
  prevPrompts: string[];
  setPrevPrompts: (value: string[] | ((prev: string[]) => string[])) => void;
  showResult: boolean;
  loading: boolean;
  resultData: string;
  conversationHistory: Message[];
  setConversationHistory: (value: Message[] | ((prev: Message[]) => Message[])) => void;
  onSent: (prompt?: string) => Promise<void>;
  stopGeneration: () => void;
  newChat: () => void;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const typingTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const savedHistory = localStorage.getItem('gemini_conversation_history');
      const savedPrompts = localStorage.getItem('gemini_prev_prompts');
      
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setConversationHistory(history);
        setShowResult(history.length > 0);
      }
      
      if (savedPrompts) {
        setPrevPrompts(JSON.parse(savedPrompts));
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const delayPara = (index: number, nextWord: string) => {
    const timeout = setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
    typingTimeoutsRef.current.push(timeout);
  };

  const stopGeneration = () => {
    // Cancel the fetch request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Clear all typing timeouts
    typingTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    typingTimeoutsRef.current = [];
    
    // Stop loading immediately to hide stop icon
    setLoading(false);
    
    // Save current progress to history if there's any result
    if (resultData && recentPrompt) {
      const currentPrompt = recentPrompt;
      const currentResponse = resultData;
      setTimeout(() => {
        setConversationHistory((prev) => [
          ...prev,
          {
            prompt: currentPrompt,
            response: currentResponse,
          },
        ]);
        setResultData("");
      }, 100);
    } else {
      setResultData("");
    }
  };

  // Save to localStorage whenever conversation history changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_conversation_history', JSON.stringify(conversationHistory));
    }
  }, [conversationHistory]);

  // Save to localStorage whenever prevPrompts changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_prev_prompts', JSON.stringify(prevPrompts));
    }
  }, [prevPrompts]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
    setConversationHistory([]);
    setRecentPrompt("");
    setPrevPrompts([]);
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gemini_conversation_history');
      localStorage.removeItem('gemini_prev_prompts');
    }
  };

  const onSent = async (prompt?: string) => {
    // Clear previous timeouts and abort any ongoing requests
    typingTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    typingTimeoutsRef.current = [];
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setResultData("");
    setLoading(true);
    setShowResult(true);
    
    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    
    let response: string;
    
    try {
      if (prompt !== undefined) {
        setRecentPrompt(prompt);
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
          signal,
        });
        if (signal.aborted) return;
        const data = await res.json();
        response = data.response;
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input }),
          signal,
        });
        if (signal.aborted) return;
        const data = await res.json();
        response = data.response;
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Request was cancelled
        return;
      }
      throw error;
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    
    // Process images - convert markdown image syntax and image URLs to img tags
    // Handle markdown images: ![alt](url)
    newResponse2 = newResponse2.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />');
    // Handle plain image URLs (http/https ending with image extensions)
    newResponse2 = newResponse2.replace(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg)(\?[^\s]*)?)/gi, '<img src="$1" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />');
    let newResponseArray = newResponse2.split(" ");
    
    // Store the complete response for history
    const fullResponse = newResponse2;
    const currentPrompt = prompt !== undefined ? prompt : input;
    
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    
    // Add to conversation history after typing animation completes and hide stop icon
    const historyTimeout = setTimeout(() => {
      setConversationHistory((prev) => [
        ...prev,
        {
          prompt: currentPrompt,
          response: fullResponse,
        },
      ]);
      // Hide stop icon after typing animation completes
      setLoading(false);
      abortControllerRef.current = null;
    }, newResponseArray.length * 75 + 100);
    typingTimeoutsRef.current.push(historyTimeout);
    
    setInput("");
  };

  const contextValue: ContextType = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    conversationHistory,
    setConversationHistory,
    stopGeneration,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

