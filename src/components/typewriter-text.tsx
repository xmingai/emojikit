"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
}

export function TypewriterText({ words }: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fallback if words is somehow empty
    if (!words || words.length === 0) return;
    const currentWord = words[wordIndex] || words[0];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        timeout = setTimeout(() => {}, 500); // Pause before typing next word
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50); // Deletion speed
      }
    } else {
      if (text === currentWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause after typing full word
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, 100); // Typing speed
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="inline-block min-w-[180px] text-left text-primary">
      {text}
      <span className="animate-pulse font-light opacity-70">|</span>
    </span>
  );
}
