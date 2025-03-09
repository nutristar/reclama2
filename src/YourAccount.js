// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

// const token = localStorage.getItem("id_token");
// const user_email = localStorage.getItem("user_email");

// const YourAccount = () => {
//   const { t } = useTranslation();
//   const [reservedSlots, setReservedSlots] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://privatroom.azurewebsites.net/api/privatroom", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({ user_email: user_email }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setReservedSlots(data.reserved_slots);
//           setVideos(data.videos);
//         } else {
//           console.error("Ошибка: ", response.status);
//         }
//       } catch (error) {
//         console.error("Ошибка запроса: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       setVideoFile(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!videoFile) return;
    
//     const formData = new FormData();
//     formData.append("video", videoFile);
//     formData.append("user_email", user_email);
    
//     try {
//       const response = await fetch("https://privatroom.azurewebsites.net/api/upload-video", {
//         method: "POST",
//         headers: {
//           Authorization: token,
//         },
//         body: formData,
//       });
      
//       if (response.ok) {
//         alert("Видео успешно отправлено на рецензирование");
//         setVideoFile(null);
//       } else {
//         console.error("Ошибка загрузки видео");
//       }
//     } catch (error) {
//       console.error("Ошибка запроса: ", error);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


//       <h2>{t('Reserved Slots')}</h2>
//       <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Owner</th>
//             <th>Status</th>
//             <th>Дата</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservedSlots.map((slot, index) => (
//             <tr key={index}>
//               <td>{slot.id}</td>
//               <td>{slot.owner}</td>
//               <td>{slot.status}</td>
//               <td>{slot.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>{t('Your Videos')}</h2>
//       <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Video URL</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {videos.map((video, index) => (
//             <tr key={index}>
//               <td>{video.id}</td>
//               <td>{video.user}</td>
//               <td><a href={video.video_url} target="_blank" rel="noopener noreferrer">{t('View Video')}</a></td>
//               <td>{video.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div 
//         onDrop={handleFileDrop} 
//         onDragOver={(event) => event.preventDefault()} 
//         style={{ border: "2px dashed #007BFF", padding: "20px", marginTop: "20px", width: "50%", textAlign: "center" }}
//       >
//         {videoFile ? <p>{videoFile.name}</p> : <p>{t('Drag and drop a video file here')}</p>}
//       </div>
//       <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
//         {t('Submit for Review')}
//       </button>
//     </div>
//   );
// };

// export default YourAccount;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import VideoUploader from "./VideoUploader";

const token = localStorage.getItem("id_token");
const user_email = localStorage.getItem("user_email");



const YourAccount = () => {
  const { t } = useTranslation();
  const [reservedSlots, setReservedSlots] = useState([]);
  const [yourVideos, setYourVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://privatroom.azurewebsites.net/api/privatroom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            user_email: user_email,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setReservedSlots(data.reserved_slots);
          setYourVideos(data.user_videos);
        } else {
          console.error("Ошибка: ", response.status);
        }
      } catch (error) {
        console.error("Ошибка запроса: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>{t('THIS IS YOUR PERSONAL ACCOUNT')}</h1>
      
      {/* Таблица забронированных слотов */}
      <h2>{t('Reserved Slots')}</h2>
      <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {reservedSlots.map((slot, index) => (
            <tr key={index}>
              <td>{slot.id}</td>
              <td>{slot.owner}</td>
              <td>{slot.status}</td>
              <td>{slot.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Таблица видео пользователя */}
      <h2>{t('Your Videos')}</h2>
      <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Video URL</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {yourVideos.map((video, index) => (
            <tr key={index}>
              <td>{video.id}</td>
              <td>{video.user}</td>
              <td>
                <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                  {t('Watch Video')}
                </a>
              </td>
              <td>{video.status}</td>
              <td>{video.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>{t('*******************')}</h1>
      <h1>{t('*******************')}</h1>
      <h1>{t('Upload_your_video')}</h1>
      <VideoUploader />


    </div>
  );
};

export default YourAccount;



