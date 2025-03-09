import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from 'axios';






const DynamoDBTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { t } = useTranslation();

const [showModal, setShowModal] = useState(false);
const [errorMessage, setErrorMessage] = useState("");


  const apiEndpoint = "https://fromdb.azurewebsites.net/api/http_trigger?";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint, { headers: { "Content-Type": "application/json" } });
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
        const responseData = await response.json();
        setFilteredData(responseData.filter((item) => item.status === "FREE"));
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (slotId, price) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots, [slotId]: !prevSelectedSlots[slotId] };
      setSelectedPrices((prevPrices) => newSelectedSlots[slotId] ? [...prevPrices, price] : prevPrices.filter((p) => p !== price));
      return newSelectedSlots;
    });
  };

  const handlePayment = async () => {
    const selectedSlotIds = Object.keys(selectedSlots).filter((slotId) => selectedSlots[slotId]);
    const token = localStorage.getItem("id_token");
    const user_email = localStorage.getItem("user_email");
    if (!token || !user_email) return alert("Авторизуйтесь заново.");

    // const firstSelectedPrice = selectedPrices.length > 0 ? selectedPrices[0] : 0;
    // console.log("firstSelectedPrice это вот ", firstSelectedPrice  )
    const firstSelectedPrice = selectedPrices
      .map(price => Number(price)) // Преобразуем в числа
      .reduce((acc, price) => acc + price, 0) * 100; // Складываем и умножаем на 100

    console.log("firstSelectedPrice это вот ", firstSelectedPrice);





    try {
      const response = await axios.post(
        "https://okokok2.azurewebsites.net/api/validate_token",
        { selectedSlotIds, user_email, selectedPrices: firstSelectedPrice },
        { params: { token } }
      );
      
      if (response.status === 200 && response.data.payment_url?.[0]) {
        window.location.href = response.data.payment_url[0];
      } else {
        alert("Ошибка: Не удалось получить ссылку для платежа.");
      }
    }
    //  catch (error) {alert(`Ошибка оплаты:  ЗАРЕГИСТРИРУЙТЕСЬ ЕЩЕ РАЗ ${error.response?.status || 'Неизвестная ошибка'}`   );    }
    catch (error) {
      setErrorMessage(`Ошибка оплаты: ЗАРЕГИСТРИРУЙТЕСЬ ЕЩЕ РА  login again please  (${error.response?.status || 'Неизвестная ошибка'})`);
      setShowModal(true);
    }
    

  };

  return (
    <div>
      



      <h3>{t('purchase')}</h3>
      <table border="1">
        <thead>
          <tr>
            <th>{t('week_number')}</th>
            <th>{t('week_days')}</th>
            <th>{t('price')}</th>
            <th>{t('status')}</th>
            <th>{t('reserve')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.week_number}</td>
              <td>{item.week_days.join(", ")}</td>
              <td>{item.price}</td>
              <td style={{ backgroundColor: item.status === "RESERVED" ? "red" : "green", color: "white" }}>
                {item.status}
              </td>
              <td>
                {item.status === "FREE" ? (
                  <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                      type="checkbox"
                      checked={selectedSlots[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id, item.price)}
                      style={{ transform: "scale(1.2)", cursor: "pointer" }}
                    />
                    <span style={{ fontSize: "14px", color: "#007BFF" }}>{t("reserve")}</span>
                  </label>
                ) : (
                  <span style={{ fontSize: "14px", color: "#666" }}>{t("reserved")}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        {t('reserving')}: <strong>{Object.values(selectedSlots).filter(Boolean).length}</strong> {t('weeks')}
      </div>
      <button
        onClick={handlePayment}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        {t('pay')}
      </button>

      {showModal && (
  <div style={{
    position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      background: "white", padding: "20px", borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)", textAlign: "center"
    }}>
      <p>{errorMessage}</p>
      <a
        href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
        style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", borderRadius: "5px", textDecoration: "none", marginTop: "10px" }}
      >
        {t("login")} / {t("registration")}
      </a>
      <br />
      <button onClick={() => setShowModal(false)} style={{ marginTop: "10px", padding: "8px 16px", border: "none", backgroundColor: "#DC3545", color: "white", borderRadius: "5px" }}>
        Закрыть
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default DynamoDBTable;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import axios from 'axios'; // Современный импорт axios

// const DynamoDBTable = () => {
//   const [filteredData, setFilteredData] = useState([]); // Отфильтрованные данные
//   const [selectedSlots, setSelectedSlots] = useState({}); // Состояние для выбранных слотов
//   const [selectedPrices, setSelectedPrices] = useState([]); // Массив выбранных цен

//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const apiEndpoint = "https://fromdb.azurewebsites.net/api/http_trigger?";
                                

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(apiEndpoint, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Ошибка HTTP: ${response.status}`);
//       }
  
//       const responseData = await response.json();
//       const freeSlots = responseData.filter((item) => item.status === "FREE");
//       setFilteredData(freeSlots);
//     } catch (error) {
//       console.error("Ошибка при получении данных из API:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     fetchData();
//   }, []);
  


//   // const handleCheckboxChange = (slotId) => {
//   //   console.log("Изменение для слота:", slotId);
//   //   setSelectedSlots((prevSelectedSlots) => {
//   //     const newSelectedSlots = {
//   //       ...prevSelectedSlots,
//   //       [slotId]: !prevSelectedSlots[slotId],
//   //     };
//   //     console.log("Обновленное состояние:", newSelectedSlots);
//   //     return newSelectedSlots;
//   //   });
//   // };
//   const handleCheckboxChange = (slotId, price) => {
//     console.log("Изменение для слота:", slotId);
    
//     setSelectedSlots((prevSelectedSlots) => {
//       const newSelectedSlots = {
//         ...prevSelectedSlots,
//         [slotId]: !prevSelectedSlots[slotId],
//       };
  
//       // Сохраняем или удаляем цену в зависимости от состояния чекбокса
//       setSelectedPrices((prevPrices) => {
//         if (newSelectedSlots[slotId]) {
//           return [...prevPrices, price];  // Добавляем цену
//         } else {
//           return prevPrices.filter((p) => p !== price);  // Убираем цену
//         }
//       });
  
//       console.log("Обновленное состояние:", newSelectedSlots);
//       return newSelectedSlots;
//     });
//   };
      
  
//   useEffect(() => {
//     const initialSelectedSlots = filteredData.reduce((acc, item) => {
//       acc[item.slot_id] = false;
//       return acc;
//     }, {});
//     setSelectedSlots(initialSelectedSlots);
//   }, [filteredData]);

//   console.log("Данные filteredData:", filteredData);
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//   const handlePayment = async () => {
//     const selectedSlotIds = Object.keys(selectedSlots).filter((slotId) => selectedSlots[slotId]);
  
//     console.log("@THIS IS WHAT YOU CHOSE:", selectedSlotIds);
  
//     // Извлекаем токен и email из локального хранилища
//     const token = localStorage.getItem("id_token");
//     const user_email = localStorage.getItem("user_email"); 
  
//     if (!token) {
//       alert("Токен не найден. Авторизуйтесь заново.");
//       return;
//     }
  
//     if (!user_email) {
//       alert("Email пользователя не найден. Авторизуйтесь заново.");
//       return;
//     }
  
//     try {
//       // Отправляем POST-запрос
//       const response = await axios.post(
//         "https://okokok2.azurewebsites.net/api/validate_token",
//         {
//           selectedSlotIds, 
//           user_email, // Добавляем email в тело запроса
//           selectedPrices // Добавляем выбранные цены
//         },
//         {
//           params: { token: token } // Токен передаём как параметр запроса
//         }
//       );
  
//       if (response.status === 200) {
//         console.log("Успешно!");
//         /// здесь какая то ручка которая перезагружает   const fetchData = async () => {
//         // fetchData();  
//         console.log("Ответ:", response.data);
//           // Получаем ссылку для платежа из ответа
//         const paymentUrl = response.data.payment_url[0];  // URL оплаты
//         if (paymentUrl) {
//           // Перенаправляем пользователя на страницу оплаты
//           window.location.href = paymentUrl;
//         } else {
//           console.error("Ошибка: Ссылка для платежа не найдена");
//           alert("Ошибка: Не удалось получить ссылку для платежа.");
//         }

//       } else {
//         console.error(`Ошибка: ${response.status}`);
//         alert(`Ошибка оплаты: ${response.status} - ${response.data}`);
//       }
//     } catch (error) {
//       if (error.response) {
//         console.error(`Ошибка: ${error.response.status}`, error.response.data);
//         alert(`Ошибка оплаты: ${error.response.status} - ${error.response.data}`);
//       } else {
//         console.error("Ошибка запроса:", error.message);
//         alert("Произошла ошибка при оплате. Попробуйте позже.");
//       }
//     }
//   };
  

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//   return (
//     <div>
//       <h3>{t('purchase')}</h3>

//       <table border="1">
//         <thead>
//           <tr>
//             <th>{t('week_number')}</th>
//             <th>{t('week_days')}</th>
//             <th>{t('price')}</th>
//             <th>{t('status')}</th>
//             <th>{t('reserve')}</th>
//           </tr>
//         </thead>

// {/* <tbody>
//   {filteredData.map((item) => (
//     <tr key={item.id}> Используем уникальный идентификатор `id` */}
//       {/* <td>{item.week_number}</td>
//       <td>{item.week_days.join(", ")}</td>
//       <td>{item.price}</td>
//       <td
//         style={{
//           backgroundColor: item.status === "RESERVED" ? "red" : "green",
//           color: "white",
//         }}
//       >
//         {item.status}
//       </td>
//       <td>
//         {item.status === "FREE" ? (
//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={selectedSlots[item.id] || false} // Привязка состояния к конкретному слоту через `id`
//               onChange={() => handleCheckboxChange(item.id)} // Обработчик изменений
//               style={{ transform: "scale(1.2)", cursor: "pointer" }}
//             />
//             <span style={{ fontSize: "14px", color: "#007BFF" }}>
//               {t("reserve")}
//             </span>
//           </label>
//         ) : (
//           <span style={{ fontSize: "14px", color: "#666" }}>
//             {t("reserved")}
//           </span>
//         )}
//       </td>
//     </tr>
//   ))}
// </tbody> */}
// <tbody>
//   {filteredData.map((item) => (
//     <tr key={item.id}> 
//       <td>{item.week_number}</td>
//       <td>{item.week_days.join(", ")}</td>
//       <td>{item.price}</td>
//       <td
//         style={{
//           backgroundColor: item.status === "RESERVED" ? "red" : "green",
//           color: "white",
//         }}
//       >
//         {item.status}
//       </td>
//       <td>
//         {item.status === "FREE" ? (
//           <label
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={selectedSlots[item.id] || false}
//               onChange={() => handleCheckboxChange(item.id, item.price)} // Передаем цену вместе с id
//               style={{ transform: "scale(1.2)", cursor: "pointer" }}
//             />
//             <span style={{ fontSize: "14px", color: "#007BFF" }}>
//               {t("reserve")}
//             </span>
//           </label>
//         ) : (
//           <span style={{ fontSize: "14px", color: "#666" }}>
//             {t("reserved")}
//           </span>
//         )}
//       </td>
//     </tr>
//   ))}
// </tbody>


//       </table>




//       {/* Подсчет выбранных недель */}
//       <div style={{ marginTop: "20px", fontSize: "18px" }}>
//         {t('reserving')}: <strong>{Object.values(selectedSlots).filter(Boolean).length}</strong> {t('weeks')}
//       </div>

//       {/* Кнопка оплаты */}
//       <button
//         onClick={handlePayment}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: "#28a745",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//         // disabled={Object.values(selectedSlots).filter(Boolean).length === 0}
//       >
//         {t('pay')}
//       </button>
//     </div>
//   );
// };

// export default DynamoDBTable;
