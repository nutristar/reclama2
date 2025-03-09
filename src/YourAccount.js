import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import VideoUploader from "./VideoUploader";
import './styles.css'; // Import the stylesheet

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
          body: JSON.stringify({ user_email }),
        });

        if (response.ok) {
          const data = await response.json();
          setReservedSlots(data.reserved_slots);
          setYourVideos(data.user_videos);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container"> {/* Use container class for general styling */}
      <h1>{t('THIS IS YOUR PERSONAL ACCOUNT')}</h1>

      <section> {/* Added semantic section elements */}
        <h2>{t('Reserved Slots')}</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Date</th>
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
      </section>

      <section>
        <h2>{t('Your Videos')}</h2>
        <table>
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
                <td><a href={video.video_url} target="_blank" rel="noopener noreferrer">{t('Watch Video')}</a></td>
                <td>{video.status}</td>
                <td>{video.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>{t('Upload_your_video')}</h2>
        <VideoUploader />
      </section>
    </div>
  );
};

export default YourAccount;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

// import VideoUploader from "./VideoUploader";

// const token = localStorage.getItem("id_token");
// const user_email = localStorage.getItem("user_email");



// const YourAccount = () => {
//   const { t } = useTranslation();
//   const [reservedSlots, setReservedSlots] = useState([]);
//   const [yourVideos, setYourVideos] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://privatroom.azurewebsites.net/api/privatroom", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: token,
//           },
//           body: JSON.stringify({
//             user_email: user_email,
//           }),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setReservedSlots(data.reserved_slots);
//           setYourVideos(data.user_videos);
//         } else {
//           console.error("Ошибка: ", response.status);
//         }
//       } catch (error) {
//         console.error("Ошибка запроса: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <h1>{t('THIS IS YOUR PERSONAL ACCOUNT')}</h1>
      
//       {/* Таблица забронированных слотов */}
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

//       {/* Таблица видео пользователя */}
//       <h2>{t('Your Videos')}</h2>
//       <table style={{ borderCollapse: "collapse", width: "80%", marginTop: "20px" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>User</th>
//             <th>Video URL</th>
//             <th>Status</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {yourVideos.map((video, index) => (
//             <tr key={index}>
//               <td>{video.id}</td>
//               <td>{video.user}</td>
//               <td>
//                 <a href={video.video_url} target="_blank" rel="noopener noreferrer">
//                   {t('Watch Video')}
//                 </a>
//               </td>
//               <td>{video.status}</td>
//               <td>{video.created_at}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h1>{t('*******************')}</h1>
//       <h1>{t('*******************')}</h1>
//       <h1>{t('Upload_your_video')}</h1>
//       <VideoUploader />


//     </div>
//   );
// };

// export default YourAccount;



