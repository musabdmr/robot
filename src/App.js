import React, { useState } from 'react';
import axios from 'axios';

function RobotInterface() {
  const [message, setMessage] = useState("1");
  const [sentData, setSentData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);

  const sendDirectionToBackend = (direction) => {
    const messageData = {
      message: direction.toString(),
    };

    // JSON verisini backend'e gönderin
    axios.post('http://backend-url/api/messages', messageData)
      .then(response => {
        console.log('Gönderilen Veri: ', messageData);
        console.log('Alınan Veri: ', response.data);
        setSentData(messageData);
        setReceivedData(response.data);
      })
      .catch(error => {
        console.error('Hata oluştu: ', error);
      });
  }

  return (
    <div>
      <button onClick={() => { 
        setMessage("0");
        sendDirectionToBackend(0);
      }}>Dur</button>
      <button onClick={() => { 
        setMessage("1");
        sendDirectionToBackend(1);
      }}>İleri</button>
      <button onClick={() => { 
        setMessage("2");
        sendDirectionToBackend(2);
      }}>Sağ</button>
      <button onClick={() => { 
        setMessage("3");
        sendDirectionToBackend(3);
      }}>Geri</button>
      <button onClick={() => { 
        setMessage("4");
        sendDirectionToBackend(4);
      }}>Sol</button>

      {sentData && (
        <div>
          <h3>Gönderilen Veri:</h3>
          <pre>{JSON.stringify(sentData, null, 2)}</pre>
        </div>
      )}

      {receivedData && (
        <div>
          <h3>Alınan Veri:</h3>
          <pre>{JSON.stringify(receivedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default RobotInterface;
