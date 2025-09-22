import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { User } from '../contexts/UserContext';
import { WeatherData } from '../services/weatherService';
import { MoodType } from '../utils/moods';
import { ColorType } from '../utils/colorAnalysis';
import { ChatMessage, getOutfitAdvice } from '../services/geminiService';

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff6b9d, #7a5cf4);
  color: #ffffff;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(122, 92, 244, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1100;

  &:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow: 0 25px 50px rgba(122, 92, 244, 0.45);
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 56px;
    height: 56px;
    font-size: 1.8rem;
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 7.5rem;
  right: 2rem;
  width: 360px;
  max-height: 520px;
  background: rgba(10, 10, 25, 0.95);
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1200;

  @media (max-width: 768px) {
    right: 1rem;
    left: 1rem;
    width: auto;
    bottom: 6.5rem;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, rgba(122, 92, 244, 0.9), rgba(255, 107, 157, 0.85));
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 700;
    font-size: 1rem;
  }

  span:last-child {
    font-size: 0.85rem;
    opacity: 0.85;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
`;

const MessagesWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
`;

const MessageBubble = styled.div<{ $isAssistant: boolean }>`
  align-self: ${props => (props.$isAssistant ? 'flex-start' : 'flex-end')};
  background: ${props => (props.$isAssistant ? 'rgba(122, 92, 244, 0.15)' : 'linear-gradient(135deg, #ff6b9d, #7a5cf4)')};
  color: #ffffff;
  border: ${props => (props.$isAssistant ? '1px solid rgba(122, 92, 244, 0.4)' : 'none')};
  padding: 0.9rem 1rem;
  border-radius: 18px;
  max-width: 90%;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: ${props => (props.$isAssistant ? '0 12px 25px rgba(122, 92, 244, 0.15)' : '0 12px 25px rgba(122, 92, 244, 0.35)')};
  white-space: pre-wrap;
`;

const InputArea = styled.form`
  padding: 0.85rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 0.6rem;
  background: rgba(10, 10, 25, 0.85);
`;

const ChatInput = styled.textarea`
  flex: 1;
  border: 1px solid rgba(122, 92, 244, 0.4);
  border-radius: 16px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  resize: none;
  font-family: 'Nunito', sans-serif;
  font-size: 0.9rem;
  min-height: 44px;
  max-height: 88px;
  line-height: 1.4;

  &:focus {
    outline: none;
    border-color: rgba(255, 107, 157, 0.7);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #7a5cf4, #4f8cff);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 0 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(79, 140, 255, 0.35);
  }
`;

const AssistantPlaceholder = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 0 1rem;
`;

const ErrorBanner = styled.div`
  background: rgba(255, 77, 109, 0.15);
  color: #ff677d;
  border: 1px solid rgba(255, 77, 109, 0.3);
  border-radius: 14px;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  line-height: 1.4;
`;

interface OutfitChatBotProps {
  user: User;
  weather: WeatherData;
  mood?: MoodType | null;
  colorType?: ColorType | null;
}

const OutfitChatBot: React.FC<OutfitChatBotProps> = ({ user, weather, mood, colorType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  const conversationContext = useMemo(
    () => ({ user, weather, mood: mood ?? null, colorType: colorType ?? null }),
    [user, weather, mood, colorType]
  );

  const requestAdvice = useCallback(
    async (conversation: ChatMessage[]) => {
      setIsLoading(true);
      setError('');
      try {
        const response = await getOutfitAdvice(conversation, conversationContext);
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Не удалось получить ответ от ассистента';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [conversationContext]
  );

  const handleOpen = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen && messages.length === 0) {
      const initialPrompt: ChatMessage = {
        role: 'user',
        text: 'Подскажи, какой образ мне выбрать сегодня, учитывая мою погоду и стиль.'
      };
      const conversation = [...messages, initialPrompt];
      setMessages(conversation);
      void requestAdvice(conversation);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', text: inputValue.trim() };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInputValue('');
    void requestAdvice(conversation);
  };

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <>
      <FloatingButton onClick={handleOpen} aria-label="AI стилист">
        💬
      </FloatingButton>

      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <HeaderTitle>
              <span>AI стилист</span>
              <span>Рекомендации по твоему образу</span>
            </HeaderTitle>
            <CloseButton onClick={handleOpen} aria-label="Закрыть чат">
              ×
            </CloseButton>
          </ChatHeader>

          <MessagesWrapper>
            {messages.length === 0 && !isLoading && (
              <AssistantPlaceholder>
                Задай вопрос Асей или позволь ей предложить образ.
              </AssistantPlaceholder>
            )}

            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} $isAssistant={message.role === 'assistant'}>
                {message.text}
              </MessageBubble>
            ))}

            {isLoading && (
              <MessageBubble $isAssistant={true}>
                Ася думает...
              </MessageBubble>
            )}

            {error && <ErrorBanner>{error}</ErrorBanner>}
            <div ref={scrollAnchorRef} />
          </MessagesWrapper>

          <InputArea onSubmit={handleSubmit}>
            <ChatInput
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Спроси про образ или попроси совет..."
              rows={2}
            />
            <SendButton type="submit" disabled={!inputValue.trim() || isLoading}>
              ➤
            </SendButton>
          </InputArea>
        </ChatWindow>
      )}
    </>
  );
};

export default OutfitChatBot;
