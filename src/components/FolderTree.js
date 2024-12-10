import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFileAlt, FaTrashAlt, FaPlus } from 'react-icons/fa';

const FolderTree = ({ data, onCreateFolder, onCreateFile, onDeleteItem }) => {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folderName) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const renderFolder = (folderName, contents) => {
    return (
      <div className="folder-container" key={folderName}>
        <div className="folder-header" onClick={() => toggleFolder(folderName)}>
          {openFolders[folderName] ? <FaFolderOpen className="folder-open" /> : <FaFolder />}
          <span>{folderName}</span>
          <button onClick={(e) => { e.stopPropagation(); onCreateFile(folderName); }}><FaPlus /> File</button>
          <button onClick={(e) => { e.stopPropagation(); onCreateFolder(folderName); }}><FaPlus /> Folder</button>
          <button onClick={(e) => { e.stopPropagation(); onDeleteItem(folderName); }} className="delete-btn"><FaTrashAlt /></button>
        </div>

        {openFolders[folderName] && (
          <div className="folder-content">
            {Array.isArray(contents)
              ? contents.map((file, index) => (
                  <div className="file-item" key={index}>
                    <FaFileAlt className="file-icon" /> {file}
                    <button onClick={() => onDeleteItem(file)}><FaTrashAlt /></button>
                  </div>
                ))
              : Object.keys(contents).map(subFolder => renderFolder(subFolder, contents[subFolder]))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {Object.keys(data).map(folder => renderFolder(folder, data[folder]))}
    </div>
  );
};

export default FolderTree;
