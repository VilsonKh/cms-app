import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Latest Comments": "Latest Comments",
      "Top Designers": "Top Designers",
      "Tasks Overview": "Tasks Overview",
      "Designers": "Designers",
      "Median Time": "Median Time",
      "Tasks Completed": "Tasks Completed",
      "Week": "Week"
    },
  },
  ru: {
    translation: {
      "Latest Comments": "Последние комментарии",
      "Top Designers": "Лучшие дизайнеры",
      "Tasks Overview": "Обзор задач",
      "Designers": "Дизайнеры",
      "Median Time": "Медианное время",
      "Tasks Completed": "Завершенные задачи",
      "Week": "Неделя"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
