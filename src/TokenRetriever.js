// import React, { useEffect } from "react";
// import axios from "axios";

// const decodeBase64 = (base64) => {
//   try {
//     return JSON.parse(atob(base64));
//   } catch (error) {
//     console.error("Error decoding base64:", error);
//     return null;
//   }
// };

// const TokenRetriever = () => {
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const code = queryParams.get("code");

//     if (code) {
//       const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;

//       axios
//         .post(endpoint, { code })
//         .then((response) => {
//           const {
//             id_token,
//             access_token,
//             refresh_token,
//             expires_in,
//             profile_info,
//           } = response.data;

//           console.log("Access Token:", access_token);
//           console.log("ID Token:", id_token);
//           console.log("Refresh Token:", refresh_token);
//           console.log("Expires In:", expires_in);
//           console.log("Profile Info (raw):", profile_info);

//           // Декодируем `id_token` для получения информации о пользователе
//           if (id_token) {
//             const [header, payload] = id_token.split(".").slice(0, 2);
//             const userInfo = decodeBase64(payload);
          
//             if (userInfo) {
//               console.log("User Info from ID Token:", userInfo);
//               console.log("Last Name:", userInfo.family_name);
//               console.log("First Name:", userInfo.given_name);

//               // Извлекаем email
//               const userEmail = userInfo.email || (userInfo.emails ? userInfo.emails[0] : null);
//               console.log("Extracted Email:", userEmail);
//             }

//           }

//           // Декодируем `profile_info`, если он доступен
//           if (profile_info) {
//             const profileData = decodeBase64(profile_info);
          
//             if (profileData) {
//               // Проверяем, есть ли данные
//               console.log("это Профиль инфо",profileData);             
          
//             } else {
//               console.error("Failed to decode profile_info");
//             }
//           } else {
//             console.warn("profile_info is missing or undefined");
//           }
          

//           // Сохраняем токены и информацию о пользователе
//           localStorage.setItem("access_token", access_token);
//           localStorage.setItem("id_token", id_token);
//           localStorage.setItem("refresh_token", refresh_token);
//           localStorage.setItem("profile_info", profile_info);
//           localStorage.setItem("profile_info", emails);
          
//         })
//         .catch((error) => {
//           console.error("Error sending code to endpoint:", error);
//         });
//     } else {
//       console.warn("Code parameter is missing in the URL");
//     }
//   }, []);

//   return (
//     <div>
//       {/* <h1>Token Retriever</h1>
//       <p>Check the console for token and user details.</p> */}
//     </div>
//   );
// };

// export default TokenRetriever;
////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect } from "react";
import axios from "axios";

const decodeBase64 = (base64) => {
  try {
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Error decoding base64:", error);
    return null;
  }
};

const TokenRetriever = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    if (code) {
      const endpoint = `https://tokenretriv.azurewebsites.net/api/tokenretriever`;

      axios
        .post(endpoint, { code })
        .then((response) => {
          const { id_token, access_token, refresh_token, profile_info } = response.data;

          console.log("Access Token:", access_token);
          console.log("ID Token:", id_token);
          console.log("Refresh Token:", refresh_token);
          console.log("Profile Info (raw):", profile_info);

          let userEmail = null;

          // Декодируем `id_token` для получения информации о пользователе
          if (id_token) {
            const [, payload] = id_token.split(".").slice(0, 2);
            const userInfo = decodeBase64(payload);
            
            if (userInfo) {
              console.log("User Info from ID Token:", userInfo);

              console.log("last_name:", userInfo.family_name);
              localStorage.setItem("last_name:", userInfo.family_name);

              console.log("first_name:", userInfo.given_name);
              localStorage.setItem("first_name:", userInfo.given_name);

              // Извлекаем email
              userEmail = userInfo.email || (userInfo.emails ? userInfo.emails[0] : null);
              console.log("Extracted Email:", userEmail);
            }
          }

          // Сохраняем данные в localStorage
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("id_token", id_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("profile_info", profile_info);

          if (userEmail) {
            localStorage.setItem("user_email", userEmail);
          }

        })
        .catch((error) => {
          console.error("Error sending code to endpoint:", error);
        });
    } else {
      console.warn("Code parameter is missing in the URL");
    }
  }, []);

  return <div></div>;
};

export default TokenRetriever;
