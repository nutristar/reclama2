import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const LinkYouPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Link
        to="/"
        style={{ marginBottom: "20px", fontSize: "18px", textDecoration: "none", color: "#007BFF" }}
      >
        <h3> Вернуться на главную </h3>
      </Link>

      <h1> {t('link_to_your_site')} ?</h1>
      <h4> {t('link_to_your_site_text')} </h4>

      {/* Добавляем изображения */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        
        <img src="kris_qr.jpg" /> 
        
     
      </div>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}></div>
      <img src="patatos.gif" /> </div>


  );
};

export default LinkYouPage;

