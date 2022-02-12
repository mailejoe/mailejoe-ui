import { useContext, useMemo } from 'react';
import LanguageContext from './Context';
import en from './en';
import es from './es';

import { Translation } from './types';

interface Translations {
  [key: string]: Translation;
}

const languages: Translations = {
  en,
  es,
};

function useTranslation() {
  const language = useContext(LanguageContext);

  const result = useMemo(() => {
    const translations = languages[language.language];
    const english = languages['en'];
    return language.language === 'en'
      ? translations
      : { ...english, ...translations };
  }, [language.language]);

  return result;
}

export default useTranslation;
