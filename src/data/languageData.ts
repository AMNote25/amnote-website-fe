import VN from 'country-flag-icons/react/3x2/VN';
import US from 'country-flag-icons/react/3x2/US';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import KR from 'country-flag-icons/react/3x2/KR';

// Language types
export type LanguageCode = 'VI' | 'EN' | 'ZH' | 'JA' | 'KO';

export interface LanguageData {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  flagComponent: React.ComponentType<any>;
  countryCode: string;
  direction: string;
  locale: string;
}

// Language Registry
export const languageData: Record<LanguageCode, LanguageData> = {
  VI: {
    code: 'VI',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    flagComponent: VN,
    countryCode: 'VN',
    direction: 'ltr',
    locale: 'vi-VN'
  },
  EN: {
    code: 'EN',
    name: 'Tiếng Anh',
    nativeName: 'English',
    flag: '🇺🇸',
    flagComponent: US,
    countryCode: 'US',
    direction: 'ltr',
    locale: 'en-US'
  },
  ZH: {
    code: 'ZH',
    name: 'Tiếng Trung',
    nativeName: '中文',
    flag: '🇨🇳',
    flagComponent: CN,
    countryCode: 'CN',
    direction: 'ltr',
    locale: 'zh-CN'
  },
  JA: {
    code: 'JA',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    flag: '🇯🇵',
    flagComponent: JP,
    countryCode: 'JP',
    direction: 'ltr',
    locale: 'ja-JP'
  },
  KO: {
    code: 'KO',
    name: 'Tiếng Hàn',
    nativeName: '한국어',
    flag: '🇰🇷',
    flagComponent: KR,
    countryCode: 'KR',
    direction: 'ltr',
    locale: 'ko-KR'
  }
};

// Available languages for the application
export const availableLanguages = ['VI', 'EN', 'ZH', 'JA', 'KO'];

// Extended languages (all supported languages)
export const allLanguages = Object.keys(languageData);

// Helper functions
export const getLanguageByCode = (code: LanguageCode) => {
  return languageData[code] || languageData.VI;
};

export const getAvailableLanguages = () => {
  return availableLanguages.map(code => languageData[code as LanguageCode]);
};

export const getAllLanguages = () => {
  return allLanguages.map(code => languageData[code as LanguageCode]);
};

export const isLanguageAvailable = (code: LanguageCode) => {
  return availableLanguages.includes(code);
};

export const getDefaultLanguage = () => {
  return languageData.VI;
};

export const validateLanguageCode = (code: LanguageCode) => {
  return Object.keys(languageData).includes(code);
};

export default languageData;
