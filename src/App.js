import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Хук для перевода
import DynamoDBTable from "./DynamoDBTable";
import HowPeople from "./HowPeople";
import LinkYouPage from "./linkYouPage";
import YourAccount from "./YourAccount";
import StepByStep from "./StepByStep";
import "./App.css"; // Styles


const App = () => {
  const { t } = useTranslation();
  
  // Состояние пользователя
  const [user, setUser] = useState({
    firstName: localStorage.getItem("first_name:"),
    lastName: localStorage.getItem("last_name:"),
  });

  // Обновление состояния, если localStorage меняется через событие
  useEffect(() => {
    const handleStorageChange = () => {
      const firstName = localStorage.getItem("first_name:");
      const lastName = localStorage.getItem("last_name:");
      setUser({ firstName, lastName });
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Обновление состояния пользователя каждые 1000 мс (1 секунда)
  useEffect(() => {
    const interval = setInterval(() => {
      const firstName = localStorage.getItem("first_name:");
      const lastName = localStorage.getItem("last_name:");

      if (firstName && lastName && firstName !== "None" && lastName !== "None") {
        setUser({ firstName, lastName }); // Обновляем состояние
      }
    }, 1000);

    return () => clearInterval(interval); // Очистка при размонтировании
  }, []);

  const isUserRegistered = user.firstName && user.lastName && user.firstName !== "None" && user.lastName !== "None";

  

function RegistrationLogin() {
  const { t } = useTranslation();

  return (
    <div className="button-container">
      <a
        href="https://denbarskris.b2clogin.com/denbarskris.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupandin&client_id=de8b522f-47b2-4da7-b6a1-74bc333c5029&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fwww.mune.pl&scope=openid&response_type=code&prompt=login"
        className="login-button"
      >
        {t("login")} / {t("registration")}
      </a>

    </div>
  );
}


  return (
    <div>
      
      <div style={{ display: "flex" }}>

        <nav style={{ width: "200px", padding: "20px", background: "#f4f4f4" }}>

      <div className="greeting-container">
        {isUserRegistered ? (
          <>
            {/* <h1>{t('Hi')}, {user.firstName} {user.lastName}! <br/></h1>
            <br/> */}
           

      
            <li>
            <span>{t('Hi')},</span>
              <span>{user.firstName} {user.lastName}!</span>
              <br/>
              <br/>
              <Link to="/profile">{t('PERSONAL_ACCOUNT')}</Link>
            </li>      

          </>
          
        ) : (
          <h1> <RegistrationLogin /> </h1>
        )}
      </div>



          <ul className="menu-list">
            {/* <li>
              <Link to="/profile">{t('Личный кабинет')}</Link>
            </li> */}

            <h2>{t('menu')}</h2>
            <li>
              <Link to="/">{t('home')}</Link>
            </li>
            <li>
              <Link to="/slots">{t('free_slots')}</Link>
            </li>
            <li>
              <Link to="/howpeoples">{t('how_many_people')}</Link>
            </li>
            <li>
              <Link to="/link_to_your_site">{t('link_to_your_site')}</Link>
            </li>
            <li>
              <Link to="/slots">{t('Buy_ free_slots')}</Link>
            </li>
          </ul>
        </nav>

        {/* Основной контент */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/profile" element={<YourAccount />} />
          </Routes>
          <Routes>
            {/* <Route path="/profile" element={<YourAccount />} /> */}
            <Route path="/" element={<StepByStep />} />
            <Route path="/slots" element={<DynamoDBTable />} />
            <Route path="/howpeoples" element={<HowPeople />} />
            <Route path="/link_to_your_site" element={<LinkYouPage />} />

          </Routes>
        </div>
      </div>
    </div>
  );
};



export default App;


