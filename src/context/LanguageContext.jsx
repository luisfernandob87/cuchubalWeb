import React, { createContext, useState, useContext, useEffect } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';
import moment from 'moment';
import 'moment/dist/locale/es'; // Import Spanish locale for moment

const LanguageContext = createContext();

const translations = { es, en };

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        if (saved) return saved;

        // Auto-detect browser language
        const browserLang = navigator.language.split('-')[0];
        return translations[browserLang] ? browserLang : 'es'; // Default to Spanish if not EN
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        moment.locale(language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[language];

        for (const key of keys) {
            if (result[key] === undefined) return path; // Return key if not found
            result = result[key];
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
