import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: {
        translation: {
          gameTitle: 'Karra Jadvali O\'yini',
          startGame: 'O\'yinni boshlash',
          practiceMode: 'Mashq rejimi',
          timeAttackMode: 'Vaqtga qarshi',
          visualLearningMode: 'Vizual o\'rganish',
          tablePracticeMode: 'Karra jadvali bo\'yicha mashq',
          level: 'Daraja',
          selectedTable: 'Tanlangan jadval',
          enterAnswer: 'Javobingizni kiriting',
          check: 'Tekshirish',
          correct: 'To\'g\'ri!',
          incorrect: 'Noto\'g\'ri. Qaytadan urinib ko\'ring!',
          endGame: 'O\'yinni tugatish',
          settings: 'Sozlamalar',
          backgroundColor: 'Fon rangi',
          fontSize: 'Matn hajmi',
          language: 'Til',
          selectMultiplicationTable: 'Karra jadvalini tanlang:',
          mixed: 'Aralash',
          startPractice: 'ni boshlash',
          activeCellsCount: 'Yoqilgan katakchalar soni:',
          close: 'Yopish'
        }
      },
      ru: {
        translation: {
          gameTitle: 'Игра Таблица Умножения',
          startGame: 'Начать игру',
          practiceMode: 'Режим практики',
          timeAttackMode: 'Игра на время',
          visualLearningMode: 'Визуальное обучение',
          tablePracticeMode: 'Практика по таблице',
          level: 'Уровень',
          selectedTable: 'Выбранная таблица',
          enterAnswer: 'Введите ваш ответ',
          check: 'Проверить',
          correct: 'Правильно!',
          incorrect: 'Неправильно. Попробуйте еще раз!',
          endGame: 'Завершить игру',
          settings: 'Настройки',
          backgroundColor: 'Цвет фона',
          fontSize: 'Размер шрифта',
          language: 'Язык',
          selectMultiplicationTable: 'Выберите таблицу умножения:',
          mixed: 'Смешанный',
          startPractice: 'Начать',
          activeCellsCount: 'Количество активных ячеек:',
          close: 'Закрыть'
        }
      }
    },
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

