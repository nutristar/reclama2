import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next"; // Хук для перевода

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(
      "service_3x874qq",   // ID сервиса из EmailJS
      "template_nv6gmj6",  // ID шаблона письма
      formData,
      "NLojWH0kvUJiAH0cf"       // Ваш public user ID из EmailJS
    )
    .then(() => alert("Wiadomość wysłana!  Message sent!  Сообщение отправлено!"))
    .catch(() => alert("Błąd podczas wysyłania  Error sending message  Ошибка при отправке"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px" }}>
        <input type="text" name="name" placeholder="Name Imia Имя" onChange={handleChange} required />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <textarea name="message" placeholder="Message Wiadomosc Сообщение" onChange={handleChange} required />
      </div>
  
      <div>
        <button type="submit">{t('send')}</button>
      </div>
    </form>
  );
  
};

export default ContactForm;
