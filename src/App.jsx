import React, { useState, useEffect } from 'react';
import FileDisplay from './components/FileDisplay'; //importing components
import Header from './components/Header'

function App() {
  //initializing useState variables and useEffect
  const [uploadedFile, setUploadedFile] = useState(null);
  const [wordCount, setWordCount] = useState(0)
  const [show, setShow] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([])
  const [searchResults, setSearchResults] = useState({
    occurrences: 0,
    highlightedText: '',
  });

  useEffect(() => {
    const storedFile = localStorage.getItem('uploadedFile');
    if (storedFile) {
      setUploadedFile(JSON.parse(storedFile));
    }
    localStorage.clear()
  }, []);

  //Uploading the file and counting number of words

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) =>{
      const content = e.target.result;
      const count = content.split(/\s+/).length;
      setWordCount(count);
      setUploadedFile({ name: file.name, content: e.target.result });
    } 
    reader.readAsText(file);
    localStorage.setItem('uploadedFile', JSON.stringify({ name: file.name, content: '' })); // Placeholder for content
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if(event.target.value === '') setShow(false)
  };

  //seacrhing for the keyword, only if the file or the keyword is present
  const performSearch = () => {
    if (!uploadedFile || !searchText) return;
    const regex = new RegExp(searchText, 'gi');
    const occurrences = uploadedFile.content.match(regex)?.length || 0;
    const highlightedText = uploadedFile.content.replace(regex, (match) => `<mark>${match}</mark>`);
    setSearchResults({ occurrences, highlightedText });
    setShow(true)
    setSearchHistory((prev) => [...prev, searchText])
    console.log(searchHistory)
  };


  return (
    <div className="flex flex-col justify-center items-center">
      <Header />

      {/* Input field to upload a file and search bar  */}
      <input type="file" onChange={handleFileUpload} className='my-3' />
      <div className='flex flow-row gap-x-3 justify-center my-3'>
        <input type="text" value={searchText} onChange={handleSearchChange} placeholder="Search..." className='border-blue-400 border-2 p-1 rounded-sm' /> 
        <button className='text-white bg-blue-400 p-2 rounded-sm' onClick={performSearch}>Search</button>
      </div>

      {/* Displaying word count and searched keyword occurences */}
      <div className='flex flex-row justify-between p-2'>
        { wordCount > 0 && <p>Word count: {wordCount}</p>}
          {searchResults.occurrences > 0 &&  (
            <div className='mx-3'> 
              { show &&  <p>Found: {searchResults.occurrences} occurrence{searchResults.occurrences > 1 && 's'}</p> }
            </div>
          )}
      </div>

      {/* File content are displayed here and searched keywords are highlighted if found */}
      {uploadedFile ? ( <FileDisplay file={uploadedFile} show={show} searchResults={searchResults} /> ) : ( <p>Please upload file to see its content</p> )}

    </div>
  );
}

export default App;
