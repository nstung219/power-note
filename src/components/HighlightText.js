import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';

const HighlightText = ({ text, highlight}) => {
  const [displayText, setDisplayText] = useState("");
  const [parts, setParts] = useState([])
  const [lines, setLines] = useState([])
  const noteRef = useRef();

  const regex = useMemo(() => new RegExp(`${highlight.replaceAll(' ', '|')}`, 'gi'), [
    highlight,
  ]);

  const measureTextWidth = (line, font) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = font
    return Math.floor(context.measureText(line).width)
  }

  const calculateFittingLetters = useCallback(() => {
    if (noteRef.current) {
      const container = noteRef.current
      const computedContainer = window.getComputedStyle(container)
      const containerWidth = container.clientWidth - parseFloat(computedContainer.paddingLeft) - parseFloat(computedContainer.paddingRight);
      const font = computedContainer.font;
      const splittedLines = []
      let line = ""
      const letters = text.split("")
      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i]
        const preline = line + `${letter}`
        const lineWidth = measureTextWidth(preline, font)
        
        if (lineWidth <= containerWidth) {
          line += `${letter}`
        } else {
          splittedLines.push(line)
          line = letter
        }
      }
      setLines(splittedLines)
    }
  }, [text])

  useEffect(() => {
    calculateFittingLetters();
    window.addEventListener('resize', calculateFittingLetters);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', calculateFittingLetters);
    };
  }, [calculateFittingLetters]);

  useEffect(() => {
    let tmpText = lines[0]
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      if (line.match(regex)) {
        tmpText = line
        break
      }
    }
    setDisplayText(tmpText)
  }, [lines, regex])

  useEffect(() => {
    let newParts = []
    if (highlight !== "") { // Check if the regex is not empty
      const matches = [...displayText.matchAll(regex)]
      let lastIndex = 0;
      matches.forEach((match) => {
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;
    
        // Add the segment before the match
        if (lastIndex < matchStart) {
          newParts.push({ item: displayText.substring(lastIndex, matchStart), match: false });
        }
    
        // Add the match itself
        newParts.push({ item: match[0], match: true })
        lastIndex = matchEnd;
      });
    
      // Add the remaining text after the last match
      if (lastIndex < displayText.length) {
        newParts.push({ item: displayText.substring(lastIndex), match: false });
      }
    } else {
      newParts = [{ item: displayText, match: false }]
    }
    setParts(newParts)
  }, [highlight, displayText, regex])

  const styles = {
    spanContainer: {
      width: '100xp',
      display: 'inline',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box'
      // overflow: 'hidden'
    },
    resultItemNote: {
      display: 'inline-block',
      whiteSpace: "pre-line",
      fontSize: "16px",
      color: "white",
      // marginLeft: '10px',
      boxSizing: 'border-box',
    },
  }

  return (
    <span ref={noteRef} style={styles.spanContainer}>
      {parts.map((part, index) =>
        part.match ? (
          <span
            key={index}
            style={{...styles.resultItemNote, ...{
              backgroundColor: "rgb(106, 50, 15)",
            }}}
          >
            {part.item}
          </span>
        ) : (
          <span key={index} style={{fontSize:'16px'}}>{part.item}</span>
        )
      )}
    </span>
  );
};

export default HighlightText;
