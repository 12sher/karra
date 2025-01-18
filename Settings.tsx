import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SettingsIcon, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface SettingsProps {
  onChangeBackground: (color: string) => void
  onChangeFontSize: (size: number) => void
  onChangeLanguage: (lang: string) => void
}

export function Settings({ onChangeBackground, onChangeFontSize, onChangeLanguage }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
      >
        <SettingsIcon size={24} />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6"
          >
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              <X size={24} />
            </Button>
            <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('backgroundColor')}</h3>
                <div className="flex space-x-2">
                  <Button onClick={() => onChangeBackground('bg-gradient-to-r from-purple-400 via-pink-500 to-red-500')} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
                  <Button onClick={() => onChangeBackground('bg-gradient-to-r from-green-400 to-blue-500')} className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  <Button onClick={() => onChangeBackground('bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500')} className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('fontSize')}</h3>
                <Slider
                  defaultValue={[16]}
                  max={24}
                  min={12}
                  step={1}
                  onValueChange={(value) => onChangeFontSize(value[0])}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('language')}</h3>
                <Button onClick={() => onChangeLanguage('uz')} className="mr-2">O'zbek</Button>
                <Button onClick={() => onChangeLanguage('ru')}>Русский</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

