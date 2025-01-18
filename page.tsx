"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Star, Trophy, Clock, Eye, Brain } from 'lucide-react'
import { Tutorial } from './components/Tutorial'
import { VisualLearning } from './components/VisualLearning'
import { TableSelection } from './components/TableSelection'
import { Settings } from './components/Settings'
import { useTranslation } from 'react-i18next'
import './i18n'

const GAME_MODES = {
  PRACTICE: 'practiceMode',
  TIME_ATTACK: 'timeAttackMode',
  VISUAL: 'visualLearningMode',
  TABLE_PRACTICE: 'tablePracticeMode'
}

export default function MultiplicationGame() {
  const { t, i18n } = useTranslation()
  const [showTutorial, setShowTutorial] = useState(true)
  const [gameMode, setGameMode] = useState(GAME_MODES.PRACTICE)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState({ num1: 0, num2: 0 })
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isGameActive, setIsGameActive] = useState(false)
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [background, setBackground] = useState('bg-gradient-to-r from-purple-400 via-pink-500 to-red-500')
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    if (gameMode === GAME_MODES.TIME_ATTACK && isGameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setIsGameActive(false)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameMode, isGameActive])

  useEffect(() => {
    if (isGameActive) {
      generateQuestion()
    }
  }, [isGameActive])

  const generateQuestion = () => {
    let num1, num2;
    if (selectedTable) {
      num1 = selectedTable;
      num2 = Math.floor(Math.random() * 10) + 1;
    } else {
      num1 = Math.floor(Math.random() * level) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
    }
    setQuestion({ num1, num2 });
    setUserAnswer('');
    setFeedback('');
  }

  const handleSubmit = () => {
    const correctAnswer = question.num1 * question.num2
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1)
      setStreak(streak + 1)
      setFeedback(t('correct'))
      if (streak + 1 >= 5) {
        confetti()
        setLevel(Math.min(level + 1, 10))
        setStreak(0)
      }
    } else {
      setFeedback(t('incorrect'))
      setStreak(0)
    }
    if (gameMode !== GAME_MODES.TIME_ATTACK) {
      setTimeout(generateQuestion, 1500)
    } else {
      generateQuestion()
    }
  }

  const startGame = (mode, table = null) => {
    setGameMode(mode);
    setSelectedTable(table);
    setIsGameActive(true);
    setScore(0);
    setStreak(0);
    if (mode !== GAME_MODES.TABLE_PRACTICE) {
      setLevel(1);
    }
    if (mode === GAME_MODES.TIME_ATTACK) {
      setTimeLeft(30);
    }
  }

  if (showTutorial) {
    return (
      <div className={`min-h-screen ${background} flex items-center justify-center`} style={{ fontSize: `${fontSize}px` }}>
        <Tutorial />
        <Button onClick={() => setShowTutorial(false)} className="mt-4">
          {t('startGame')}
        </Button>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${background} flex items-center justify-center`} style={{ fontSize: `${fontSize}px` }}>
      <Settings
        onChangeBackground={setBackground}
        onChangeFontSize={setFontSize}
        onChangeLanguage={(lang) => i18n.changeLanguage(lang)}
      />
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">{t('gameTitle')}</h1>
        {!isGameActive ? (
          <div>
            <Button onClick={() => setGameMode(GAME_MODES.PRACTICE)} className="w-full mb-2">
              <Brain className="mr-2" /> {t('practiceMode')}
            </Button>
            <Button onClick={() => setGameMode(GAME_MODES.TIME_ATTACK)} className="w-full mb-2">
              <Clock className="mr-2" /> {t('timeAttackMode')}
            </Button>
            <Button onClick={() => setGameMode(GAME_MODES.VISUAL)} className="w-full mb-2">
              <Eye className="mr-2" /> {t('visualLearningMode')}
            </Button>
            <Button onClick={() => setGameMode(GAME_MODES.TABLE_PRACTICE)} className="w-full mb-2">
              <Brain className="mr-2" /> {t('tablePracticeMode')}
            </Button>
            {gameMode && (
              <TableSelection onSelect={(table) => startGame(gameMode, table)} mode={t(gameMode)} />
            )}
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{t('level')}: {level}</span>
                <div className="flex items-center">
                  <Trophy className="text-yellow-500 mr-1" />
                  <span className="text-lg font-semibold">{score}</span>
                </div>
                {gameMode === GAME_MODES.TIME_ATTACK && (
                  <div className="flex items-center">
                    <Clock className="text-red-500 mr-1" />
                    <span className="text-lg font-semibold">{timeLeft}s</span>
                  </div>
                )}
                {selectedTable && (
                  <span className="text-lg font-semibold">{t('selectedTable')}: {selectedTable}</span>
                )}
              </div>
              <Progress value={(level / 10) * 100} className="mt-2" />
            </div>
            <motion.div
              key={question.num1 + question.num2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold text-center mb-4"
            >
              {question.num1} x {question.num2} = ?
            </motion.div>
            {gameMode === GAME_MODES.VISUAL && (
              <VisualLearning num1={question.num1} num2={question.num2} />
            )}
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 text-lg border-2 border-purple-300 rounded mb-4 focus:outline-none focus:border-purple-500"
              placeholder={t('enterAnswer')}
            />
            <Button onClick={handleSubmit} className="w-full mb-4">
              {t('check')}
            </Button>
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-center font-semibold ${
                    feedback === t('correct') ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index < streak ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <Button onClick={() => setIsGameActive(false)} className="w-full mt-4">
              {t('endGame')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

