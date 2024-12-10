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
      setFolders(prev => ({
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
      setFolders(prev => ({
        ...prev,
        [folderName]: [...prev[folderName], fileName] // Add new file
      }));
    }
  };

  const handleDeleteItem = (item) => {
    const itemName = typeof item === 'string' ? item : item;
    const folderName = Object.keys(folders).find(folder => {
      return Array.isArray(folders[folder]) && folders[folder].includes(itemName);
    });

    if (folderName) {
      setFolders(prev => ({
        ...prev,
        [folderName]: prev[folderName].filter(file => file !== itemName)
      }));
    } else {
      const updatedFolders = { ...folders };
      delete updatedFolders[itemName]; // Delete folder
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