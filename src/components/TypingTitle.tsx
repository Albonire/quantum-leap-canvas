import { useState, useEffect } from 'react';

interface TypingTitleProps {
  titles: string[];
}

const TypingTitle = ({ titles }: TypingTitleProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (index >= titles.length) return;

    const currentTitle = titles[index];

    if (subIndex === currentTitle.length + 1 && !isDeleting) {
      // Pause at the end of typing
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    } else if (subIndex === 0 && isDeleting) {
      // Finished deleting
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(currentTitle.substring(0, subIndex));
    }, isDeleting ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, titles]);

  return (
    <div className="inline-block bg-sage-accent/20 dark:bg-cyber-lime/10 border border-sage-accent/50 dark:border-cyber-lime/30 rounded-full px-6 py-3 min-h-[54px]">
      <p className="text-sage-accent dark:text-cyber-lime font-space-grotesk font-semibold text-lg">
        {text}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default TypingTitle;
