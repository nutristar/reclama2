// import React, { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import AWS from "aws-sdk";

// // Настройка DynamoDB
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const tableName = "DynamoDBStack-TimeSlotsTableF0080375-EAL8HZDYELKU";

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const slotId = searchParams.get("slot_id");
//   const [slotData, setSlotData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSlotData = async () => {
//       if (slotId) {
//         const params = {
//           TableName: tableName,
//           Key: {
//             slot_id: slotId,
//           },
//         };

//         try {
//           const result = await dynamoDB.get(params).promise();
//           setSlotData(result.Item);
//         } catch (error) {
//           console.error("Ошибка при загрузке данных из DynamoDB:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchSlotData();
//   }, [slotId]);

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       {/* Ссылка на главную страницу */}
//       <Link to="/" style={{ marginBottom: "20px", fontSize: "18px", textDecoration: "none", color: "#007BFF" }}>
//         Вернуться на главную
//       </Link>

//       <h1>Страница оплаты</h1>
//       {loading ? (
//         <p>Загрузка данных...</p>
//       ) : slotData ? (
//         <>
//           <p>Вы собираетесь оплатить слот с ID: <strong>{slotData.slot_id}</strong></p>
//           <p>Дата: {slotData.date}</p>
//           <p>Месяц: {slotData.month}</p>
//           <p>Цена: {slotData.price} рублей</p>
//           <p>Время начала: {slotData.start_time}</p>
//           <p>Время окончания: {slotData.end_time}</p>
//           <p>Статус: {slotData.status}</p>
//           <p>Дата обновления: {slotData.updated_at}</p>
          
//           {slotData.status !== "Оплачено" && (
//             <button
//               onClick={() => alert(`Оплата для слота ${slotData.slot_id} прошла успешно!`)}
//               style={{
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 backgroundColor: "#28a745",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//               }}
//             >
//               Оплатить
//             </button>
//           )}
//         </>
//       ) : (
//         <p>Данные не найдены для данного слота.</p>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;
/////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import AWS from "aws-sdk";

// // Настройка DynamoDB
// const dynamoDB = new AWS.DynamoDB.DocumentClient();
// const tableName = "DynamoDBStack-TimeSlotsTableF0080375-EAL8HZDYELKU";

// const PaymentPage = () => {
//   const [searchParams] = useSearchParams();
//   const slotId = searchParams.get("slot_id");
//   const [slotData, setSlotData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSlotData = async () => {
//       if (slotId) {
//         const params = {
//           TableName: tableName,
//           Key: {
//             slot_id: slotId,
//           },
//         };

//         try {
//           const result = await dynamoDB.get(params).promise();
//           setSlotData(result.Item);
//         } catch (error) {
//           console.error("Ошибка при загрузке данных из DynamoDB:", error);
//           setError("Ошибка при загрузке данных.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchSlotData();
//   }, [slotId]);

//   const handlePayment = async () => {
//     try {
//       const response = await fetch(
//         "https://lq6zwt54gi.execute-api.eu-central-1.amazonaws.com/default/create_order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             quantityPLN: slotData.price, // Используем цену из данных слота
//             iban: "PL61109010140000071219812874", // Укажите актуальный IBAN
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Ошибка при оплате: ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (data.redirect_url) {
//         window.location.href = data.redirect_url; // Перенаправление пользователя
//       } else {
//         throw new Error("Не удалось получить redirect_url.");
//       }
//     } catch (error) {
//       console.error("Ошибка при оплате:", error);
//       setError("Ошибка при обработке оплаты.");
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <Link
//         to="/"
//         style={{ marginBottom: "20px", fontSize: "18px", textDecoration: "none", color: "#007BFF" }}
//       >
//         Вернуться на главную
//       </Link>

//       <h1>Страница оплаты</h1>
//       {loading ? (
//         <p>Загрузка данных...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : slotData ? (
//         <>
//           <p>
//             Вы собираетесь оплатить слот с ID: <strong>{slotData.slot_id}</strong>
//           </p>
//           <p>Дата: {slotData.date}</p>
//           <p>Месяц: {slotData.month}</p>
//           <p>Цена: {slotData.price} PLN</p>
//           <p>Время начала: {slotData.start_time}</p>
//           <p>Время окончания: {slotData.end_time}</p>
//           <p>Статус: {slotData.status}</p>
//           <p>Дата обновления: {slotData.updated_at}</p>

//           {slotData.status !== "Оплачено" && (
//             <button
//               onClick={handlePayment}
//               style={{
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 backgroundColor: "#28a745",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//               }}
//             >
//               Оплатить
//             </button>
//           )}
//         </>
//       ) : (
//         <p>Данные не найдены для данного слота.</p>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;





import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import AWS from "aws-sdk";

// Настройка DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "week_slot_id";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const slotIds = searchParams.get("slot_ids")?.split(",") || []; // Получение списка slot_ids
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных по slot_ids из DynamoDB
  useEffect(() => {
    const fetchSlotsData = async () => {
      if (slotIds.length > 0) {
        try {
          const promises = slotIds.map((slotId) => {
            const params = {
              TableName: tableName,
              Key: {
                slot_id: slotId,
              },
            };
            return dynamoDB.get(params).promise();
          });

          const results = await Promise.all(promises);
          setSlotsData(results.map((res) => res.Item).filter(Boolean)); // Убираем null, если не найден слот
        } catch (error) {
          console.error("Ошибка при загрузке данных из DynamoDB:", error);
          setError("Ошибка при загрузке данных.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSlotsData();
  }, [slotIds]);

  // Обработчик для оплаты
  const handlePayment = async () => {
    try {
      const totalPrice = slotsData.reduce((sum, slot) => sum + Number(slot.price || 0), 0); // Общая сумма оплаты

      const response = await fetch(
        "https://lq6zwt54gi.execute-api.eu-central-1.amazonaws.com/default/create_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantityPLN: totalPrice, // Общая сумма
            iban: "PL61109010140000071219812874", // Укажите актуальный IBAN
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка при оплате: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url; // Перенаправление пользователя
      } else {
        throw new Error("Не удалось получить redirect_url.");
      }
    } catch (error) {
      console.error("Ошибка при оплате:", error);
      setError("Ошибка при обработке оплаты.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Link
        to="/"
        style={{ marginBottom: "20px", fontSize: "18px", textDecoration: "none", color: "#007BFF" }}
      >
        Вернуться на главную
      </Link>

      <h1>Страница оплаты</h1>
      {loading ? (
        <p>Загрузка данных...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : slotsData.length > 0 ? (
        <>
          <p>Вы собираетесь оплатить следующие слоты:</p>
          <table border="1" style={{ marginBottom: "20px" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Дата</th>
                <th>Месяц</th>
                <th>Цена (PLN)</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {slotsData.map((slot) => (
                <tr key={slot.slot_id}>
                  <td>{slot.slot_id}</td>
                  <td>{slot.date}</td>
                  <td>{slot.month}</td>
                  <td>{slot.price}</td>
                  <td>{slot.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            Общая сумма: <strong>{slotsData.reduce((sum, slot) => sum + Number(slot.price || 0), 0)}</strong> PLN
          </p>

          <button
            onClick={handlePayment}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Оплатить
          </button>
        </>
      ) : (
        <p>Слоты не найдены для указанных ID.</p>
      )}
    </div>
  );
};

export default PaymentPage;
