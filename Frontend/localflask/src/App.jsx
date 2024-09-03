import  { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Por favor selecciona un archivo primero.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error al subir el archivo');
        }
    };

    const handleGetFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/files');
            setFiles(response.data.files);
        } catch (error) {
            setMessage('Error al obtener los archivos');
        }
    };

    const handleDownload = (filename) => {
        // Crear un enlace de descarga y simular el clic
        const link = document.createElement('a');
        link.href = `http://localhost:5000/files/${filename}`;
        link.download = filename;
        link.click();
    };

    return (
        <div>
            <button onClick={() => alert('Enviador clickeado')}>Enviador</button>
            <button onClick={handleGetFiles}>Receptor</button>
            <hr />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir Archivo</button>
            <p>{message}</p>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        {file} 
                        <button onClick={() => handleDownload(file)}>Descargar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
