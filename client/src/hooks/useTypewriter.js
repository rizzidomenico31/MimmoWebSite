import { useState, useEffect } from 'react';

export function useTypewriter(lines, speed = 40, lineDelay = 400) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLines = [];
    let timeout;

    function getLineText(line) {
      if (line.command) return `${line.prompt} ${line.command}`;
      if (line.output) return line.output;
      if (line.success) return line.success;
      return '';
    }

    function getLineType(line) {
      if (line.command) return 'command';
      if (line.success) return 'success';
      return 'output';
    }

    function typeLine() {
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const line = lines[lineIndex];
      const fullText = getLineText(line);
      const type = getLineType(line);

      if (charIndex <= fullText.length) {
        const partial = fullText.slice(0, charIndex);
        const updatedLines = [
          ...currentLines,
          { text: partial, type, done: charIndex === fullText.length },
        ];
        setDisplayedLines(updatedLines);
        charIndex++;
        timeout = setTimeout(typeLine, type === 'command' ? speed : speed / 2);
      } else {
        currentLines = [
          ...currentLines,
          { text: fullText, type, done: true },
        ];
        setDisplayedLines([...currentLines]);
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(typeLine, lineDelay);
      }
    }

    timeout = setTimeout(typeLine, 500);
    return () => clearTimeout(timeout);
  }, [lines, speed, lineDelay]);

  return { displayedLines, done };
}
