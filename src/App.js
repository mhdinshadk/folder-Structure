import React, { useState } from 'react';
import FolderTree from './components/FolderTree';
import './App.css';

function App() {
  const [folders, setFolders] = useState({
    "Documents": ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    "Desktop": ["Screenshot1.jpg", "videopal.mp4"],
    "Downloads": {
      "Drivers": ["Printerdriver.dmg", "cameradriver.dmg"],
      "Images": ["chromedriver.dmg"]
    },
    "Applications": ["Webstorm.dmg", "Pycharm.dmg", "FileZila.dmg", "Mattermost.dmg"]
  });

  const handleCreateFolder = (parentFolder) => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      setFolders((prev) => ({
        ...prev,
        [parentFolder]: {
          ...prev[parentFolder],
          [folderName]: [] // Create new folder
        }
      }));
    }
  };

  const handleCreateFile = (folderName) => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      setFolders((prev) => ({
        ...prev,
        [folderName]: [...prev[folderName], fileName] // Add new file
      }));
    }
  };

  const handleDeleteItem = (item) => {
   
    if (Array.isArray(folders[item])) {
  
      setFolders((prev) => ({
        ...prev,
        [item]: prev[item].filter((file) => file !== item)
      }));
    } else {
      // Otherwise, it's a folder
      const updatedFolders = { ...folders };
      delete updatedFolders[item]; 
      setFolders(updatedFolders);
    }
  };

  return (
    <div className="App">
      <h1>Folder Structure</h1>
      <FolderTree 
        data={folders} 
        onCreateFolder={handleCreateFolder}
        onCreateFile={handleCreateFile}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
