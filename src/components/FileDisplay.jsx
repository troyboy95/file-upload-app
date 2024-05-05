import React from 'react';

const FileDisplay = ({ file, searchResults, show }) => {
  return (
    <div>
      <h2>{file.name}</h2>
      <pre className='text-white bg-slate-400 p-2'>
        {/* Using pre-tag to display the file contents with thier exact indentations  */}
       {!show && file.content } 
       {show && <pre dangerouslySetInnerHTML={{ __html: searchResults.highlightedText }} />}
        </pre>
    </div>
  );
};

export default FileDisplay;
