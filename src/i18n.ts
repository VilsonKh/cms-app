import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Latest Comments": "Latest Comments",
      "Top Designers": "Top Designers",
      "Tasks Overview": "Tasks Overview",
      "Designers": "Designers",
      "designers": "designers",
      "Median time": "Median time",
      "Completed tasks": "Completed tasks",
      "Week": "Week",
      "days": "days",
      "tasks": "tasks",
      "Username": "Username",
      "Message": "Message",
      "days ago": "days ago",
      "hours ago": "hours ago",
      "minutes ago": "minutes ago",
      "seconds ago": "seconds ago",
      "Issue": "Issue",
      "read more": "read more",
      "read less": "read less",
      "Avatar": "Avatar",
      "Name": "Name", 
      "Tasks Closed"  : "Tasks Closed",
      "Tasks In Progress": "Tasks In Progress",
      "Rows Per Page": "Rows Per Page",
      "of": "of",
      "Tasks Over Weeks": "Tasks Over Weeks",
      "Tasks Status Distribution": "Tasks Status Distribution",
    },
  },
  ru: {
    translation: {
      "Latest Comments": "Последние комментарии",
      "Top Designers": "Лучшие дизайнеры",
      "Tasks Overview": "Обзор задач",
      "Designers": "Дизайнеры",
      "designers": "дизайнеры",
      "Median time": "Медианное время",
      "Completed tasks": "Завершенные задачи",
      "Week": "Неделя",
      "days": "дней",
      "tasks": "задачи",
      "Issue": "Задача",
      "Username": "Имя пользователя",
      "Message": "Сообщение",
      "days ago": "дней назад",
      "hours ago": "часов назад",
      "minutes ago": "минут назад",
      "seconds ago": "секунд назад",
      "read more": "показать",
      "read less": "скрыть",
      "Avatar": "Аватар",
      "Name": "Имя", 
      "Tasks Closed"  : "Закрытые задачи",
      "Tasks In Progress": "В процессе",
      "Rows Per Page": "Строк на странице",
      "of": "из",
      "Tasks Over Weeks": "Задачи за недели",
      "Tasks Status Distribution": "Распределение статусов задач",
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
