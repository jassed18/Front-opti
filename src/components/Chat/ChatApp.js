import React, { useState } from 'react';
import axios from 'axios';
import './Chat.scss';  // Importa el archivo CSS
import { useAuth } from '../../context/AuthContext';

function ChatApp() {
  const {authState} = useAuth();
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [sources, setSources] = useState([]);

  const API_BASE_URL = 'http://127.0.0.1:5002';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPDF = async () => {
    if (!file) {
      alert('Por favor, selecciona un archivo PDF');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload_pdf`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error al cargar el PDF:', error);
      alert('Error al cargar el PDF');
    }
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      alert('Por favor, escribe una pregunta');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/chat`, {
        message: prompt.trim(),
        user_id: authState.user.id
      }, {
        headers: {
          'Authorization': `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.data.response.result) {
        setResponse(res.data.response.result);
        setSources(res.data.response.source_documents || []);
      } else {
        setResponse(res.data.response);
        setSources([]);
      }
    } catch (error) {
      console.error('Error al obtener la respuesta:', error);
      setResponse('Error al obtener la respuesta');
      setSources([]);
    }
  };

  return (
    <div className="app">
      <div className="unifiedSection">
        <h2>Haz una pregunta</h2>
        <input 
          type="text" 
          id="promptInput" 
          placeholder="Escribe tu pregunta aquí" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          className="input unifiedInput"
        />
        <button 
          onClick={handleSendPrompt} 
          className="button questionButton"
        >
          <i className="fa fa-paper-plane"></i> Enviar
        </button>
      </div>
      <div className="unifiedSection">
        <h2>Sube un PDF </h2>
        <div className="fileUploadSection">
          <label className="custom-file-upload">
            <input 
              type="file" 
              id="pdfFile" 
              accept=".pdf" 
              onChange={handleFileChange} 
            />
            <i className="fa fa-file-pdf"></i> Seleccionar archivo
          </label>
          <button 
            onClick={handleUploadPDF} 
            className="button uploadButton"
          >
            <i className="fa fa-cloud-upload-alt"></i> Subir PDF
          </button>
        </div>
      </div>

      <div className="responseArea">
        <h2>Respuesta:</h2>
        <div>{response}</div>
      </div>

      {sources.length > 0 && (
        <div className="sourcesArea">
          <h2>Fuentes:</h2>
          <ul className="sourcesList">
            {sources.map((source, index) => (
              <li key={index} className="sourceItem">{source}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChatApp;