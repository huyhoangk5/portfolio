import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

const usFlag = `${import.meta.env.BASE_URL}img/logo/usuk.png`;
const vnFlag = `${import.meta.env.BASE_URL}img/logo/vn.png`;

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, img: usFlag },
    { code: 'vi' as const, img: vnFlag },
  ];

  const currentLang = languages.find(lang => lang.code === language);

  const handleSelect = (code: 'en' | 'vi') => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(30, 41, 59, 0.9)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '22px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.transform = 'scale(1.08)';
          btn.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = 'none';
        }}
      >
        <img src={currentLang?.img} alt={language} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'contain' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '12px',
            borderRadius: '20px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                cursor: 'pointer',
                background:
                  language === lang.code
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'transparent',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background =
                  'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background =
                  language === lang.code
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'transparent';
              }}
            >
              <img src={lang.img} alt={lang.code} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default LanguageSelector;
