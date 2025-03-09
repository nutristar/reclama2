// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const HowPeople = () => {
  const { t } = useTranslation();


  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Link
        to="/"
        style={{ marginBottom: "20px", fontSize: "18px", textDecoration: "none", color: "#007BFF" }}
      >
        <h3> Вернуться на главную </h3>
      </Link>

      <h1> {t('how_many_people')} ?</h1>
      <h4> {t('how_many_people_text')} </h4>



      
    </div>
  );
};

export default HowPeople;
