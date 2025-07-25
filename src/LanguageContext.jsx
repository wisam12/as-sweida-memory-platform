
import React, { createContext, useContext, useState } from 'react'
import { translations } from './locale/translations'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("he")
  const t = translations[lang] || translations.he

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
