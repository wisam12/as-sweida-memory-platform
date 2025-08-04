
const axios = require('axios');
const API_KEY = 'AIzaSyAHEcrPJ8WzdbdppY5dGrTWZhPFXOeuq1c';

/**
 * Translate a text string to a target language using Google Translate API.
 * @param {string} text - Text to translate
 * @param {string} targetLang - Language to translate into (e.g., 'en' or 'ar')
 * @returns {Promise<string>} - Translated text
 */
async function translateText(text, targetLang) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLang,
      format: 'text'
    });

    return response.data.data.translations[0].translatedText;
  } catch (err) {
    console.error('Translation API Error:', err?.response?.data || err.message);
    throw err;
  }
}

module.exports = { translateText };
