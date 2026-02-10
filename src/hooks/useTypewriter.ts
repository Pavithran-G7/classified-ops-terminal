import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypewriter({ text, speed = 40, delay = 0, onComplete, enabled = true }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setDisplayed('');
    setIsComplete(false);
    setIsStarted(false);

    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay, enabled]);

  useEffect(() => {
    if (!isStarted || !enabled) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, text, speed, enabled, onComplete]);

  return { displayed, isComplete, isStarted };
}

export function useSequentialTypewriter(lines: { text: string; speed?: number; delay?: number }[]) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [allComplete, setAllComplete] = useState(false);

  const line = lines[currentLine];

  const { displayed, isComplete } = useTypewriter({
    text: line?.text || '',
    speed: line?.speed || 40,
    delay: currentLine === 0 ? (line?.delay || 0) : 200,
    enabled: currentLine < lines.length,
  });

  useEffect(() => {
    setCurrentText(displayed);
  }, [displayed]);

  useEffect(() => {
    if (isComplete && currentLine < lines.length) {
      setCompletedLines(prev => [...prev, lines[currentLine].text]);
      if (currentLine < lines.length - 1) {
        setCurrentLine(prev => prev + 1);
      } else {
        setAllComplete(true);
      }
    }
  }, [isComplete, currentLine, lines]);

  return { completedLines, currentText, currentLine, allComplete };
}
