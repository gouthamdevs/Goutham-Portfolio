import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const DEFAULT_PHRASES = [
  "Game Developer",
  "Unity | Unreal | Godot",
];

export default function TypewriterText({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 85,
  deletingSpeed = 40,
  pauseDuration = 1800,
  className = "",
}: TypewriterTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timeout: number;

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        timeout = window.setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing current phrase, pause before deleting
        timeout = window.setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting backwards
      if (displayText.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = window.setTimeout(() => {}, 300);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <div className={`about-typewriter-wrapper ${className}`}>
      <span className="about-typewriter-text">
        {displayText}
        <span className="about-typewriter-cursor" aria-hidden="true">
          |
        </span>
      </span>
    </div>
  );
}
