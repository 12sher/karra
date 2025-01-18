import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from 'lucide-react'

const tutorialSteps = [
  {
    title: "Karra jadvalini o'rganamiz!",
    content: "Bu o'yin orqali siz karra jadvalini oson va qiziqarli tarzda o'rganasiz."
  },
  {
    title: "Savolga javob bering",
    content: "Ekranda ko'rsatilgan ikki sonni bir-biriga ko'paytiring va javobni kiriting."
  },
  {
    title: "Darajalar va mukofotlar",
    content: "To'g'ri javoblar uchun ball to'plang va yangi darajalarga chiqing. Ketma-ket to'g'ri javoblar uchun maxsus mukofotlar olasiz!"
  },
  {
    title: "Turli o'yin rejimlari",
    content: "Vaqtga qarshi poyga, vizual o'rganish va boshqa qiziqarli rejimlarni sinab ko'ring."
  }
]

export function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-600">{tutorialSteps[currentStep].title}</h2>
      <p className="mb-6">{tutorialSteps[currentStep].content}</p>
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2" /> Orqaga
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(tutorialSteps.length - 1, currentStep + 1))}
          disabled={currentStep === tutorialSteps.length - 1}
        >
          {currentStep === tutorialSteps.length - 1 ? "Tugatish" : "Keyingisi"} <ChevronRight className="ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}

