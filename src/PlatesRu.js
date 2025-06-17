const JpgViewer = () => {
    const imageCount = 12;
    const imageBasePath = "/plates/ru"; // публичная папка в React (внутри /public)
  
    const images = Array.from({ length: imageCount }, (_, i) => 
      `${imageBasePath}/file_${i + 1}.jpg`
    );
  
    return (
      <div style={{ padding: '20px' }}>
        {images.map((src, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <img
              src={src}
              alt={`Page ${index + 1}`}
              style={{ width: '100%', maxWidth: '900px', display: 'block', margin: '0 auto' }}
            />
          </div>
        ))}
      </div>
    );
  };
  
  export default JpgViewer;
  