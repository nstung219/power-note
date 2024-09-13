import React, {useState} from 'react';

const HighlightText = ({ text, highlight }) => {
  const [displayText, setDisplayText] = useState();
  
  const regex = new RegExp(`(${highlight.replaceAll(" ", "|")})`, "gi");
  const parts = [];
  if (highlight !== "") { // Check if the regex is not empty
    const matches = [...text.matchAll(regex)];
  
    let lastIndex = 0;
  
    matches.forEach((match) => {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;
  
      // Add the segment before the match
      if (lastIndex < matchStart) {
        parts.push({ item: text.substring(lastIndex, matchStart), match: false });
      }
  
      // Add the match itself
      parts.push({ item: match[0], match: true });
  
      lastIndex = matchEnd;
    });
  
    // Add the remaining text after the last match
    if (lastIndex < text.length) {
      parts.push({ item: text.substring(lastIndex), match: false });
    }
  } else {
    // If regex is empty, return the whole text as a single non-matching part
    parts.push({ item: text, match: false });
  }

  const styles = {
    resultItemNote: {
      whiteSpace: "pre-line",
      fontSize: "16px",
      color: "white",
      // marginLeft: '10px',
      boxSizing: 'border-box',
    },
  }

  return (
    <span style={{maxHeight: "18px", overflow: "hidden"}}>
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