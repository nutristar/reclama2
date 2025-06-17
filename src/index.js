// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import TokenRetriever from "./TokenRetriever";
// import "./index.css"; // Стили
// import reportWebVitals from "./reportWebVitals";
// import "./i18n"; // i18n конфигурация
// import { useTranslation } from "react-i18next";
// import i18n from "./i18n";
// ///////////////////////////////////////////////////////////////////////////////////////////////////

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/autoplay"; // Можно не добавлять отдельно, но полезно
// import { Navigation, Autoplay } from "swiper/modules";

// const Carousel = () => {
//   return (
//     <Swiper
//       navigation
//       modules={[Navigation, Autoplay]} // Добавляем Autoplay
//       loop={true}
//       autoplay={{ delay: 3000, disableOnInteraction: false }} // 3 секунды между слайдами
//       style={{ width: "35%", height: "10%" }}
//     >
//       <SwiperSlide>
//         <img src="image1.jpg" alt="Slide 1" style={{ width: "100%", height: "100%" }} />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="image2.jpg" alt="Slide 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src="image3.jpg" alt="Slide 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//       </SwiperSlide>
//     </Swiper>
//   );
// };

// // export default Carousel;

// // export default Carousel;


// ////////////////////////////////////////////////////////////////////////////////////////////////


// const root = ReactDOM.createRoot(document.getElementById("root"));

// function LanguageSwitcher() {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lang) => {
//     localStorage.setItem("language", lang);
//     i18n.changeLanguage(lang); // Меняем язык
//   };

//   return (
//     <div>
//     <div className="lang">
//       <button onClick={() => changeLanguage("en")}>EN</button>
//       <button onClick={() => changeLanguage("ru")}>RU</button>
//       <button onClick={() => changeLanguage("pl")}>PL</button>
//       <button onClick={() => changeLanguage("de")}>DE</button>
//       <button onClick={() => changeLanguage("uk")}>UK</button>
//     </div>
//     </div>
//   );
// }

// // Восстановление выбранного языка из localStorage
// const savedLanguage = localStorage.getItem("language");
// if (savedLanguage) {
//   i18n.changeLanguage(savedLanguage);
// }
// root.render(
//   <BrowserRouter>
//     <LanguageSwitcher />
//     <Carousel />
//     <App />
//     <TokenRetriever />
//   </BrowserRouter>
// );

// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TokenRetriever from "./TokenRetriever";
import reportWebVitals from "./reportWebVitals";
import "./i18n"; // i18n configuration
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';


const Carousel = () => {
  return (
    <div className="carousel-container"> {/* Added container for styling */}
      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <img src="image1.jpg" alt="Slide 1" className="carousel-image" /> {/* Added class */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="image2.jpg" alt="Slide 2" className="carousel-image" /> {/* Added class */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="image3.jpg" alt="Slide 3" className="carousel-image" /> {/* Added class */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="language-switcher"> {/* Added class for styling */}
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <button onClick={() => changeLanguage("pl")}>PL</button>
      <button onClick={() => changeLanguage("de")}>DE</button>
      <button onClick={() => changeLanguage("uk")}>UK</button>
    </div>
  );
}

// Restore selected language from localStorage
const savedLanguage = localStorage.getItem("language");
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

root.render(
  <React.StrictMode> {/* Added React.StrictMode */}
    <BrowserRouter>
      <div className="app-container"> {/* Added container for overall styling */}
        <LanguageSwitcher />
        <Carousel />
        <App />
        <TokenRetriever />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
