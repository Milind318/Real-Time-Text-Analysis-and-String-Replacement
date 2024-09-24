import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState(''); // Text entered by the user
  const [searchText, setSearchText] = useState(''); // Search string
  const [replaceText, setReplaceText] = useState(''); // Replacement string
  const [highlightedText, setHighlightedText] = useState(''); // Text after highlighting
  
  // Real-time statistics for unique word count and character count excluding spaces/punctuation
  const uniqueWordsCount = (inputText) => {
    const words = inputText.toLowerCase().match(/\b(\w+)\b/g) || [];
    const uniqueWords = new Set(words);
    return uniqueWords.size;
  };

  const characterCount = (inputText) => {
    return inputText.replace(/[^a-zA-Z0-9]/g, '').length;
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
  };

  const handleReplace = () => {
    const newText = text.split(searchText).join(replaceText); // Case-sensitive replacement
    setText(newText);

    // Bonus feature: Highlight replaced words
    const highlighted = newText.replace(
      new RegExp(`(${replaceText})`, 'g'),
      `<span class="highlight">$1</span>`
    );
    setHighlightedText(highlighted);
  };

  useEffect(() => {
    // Update highlighted text if there's no replacement action
    setHighlightedText(text);
  }, [text]);

  return (
    <div className="app">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type your text here..."
        rows="10"
        cols="50"
      />

      <div className="stats">
        <p>Unique Words: {uniqueWordsCount(text)}</p>
        <p>Character Count (Excluding Spaces/Punctuation): {characterCount(text)}</p>
      </div>

      <div className="replacement">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search string"
        />
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with"
        />
        <button onClick={handleReplace}>Replace All</button>
      </div>

      <div className="highlighted-text" dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </div>
  );
}

export default App;
