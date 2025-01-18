import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface VisualLearningProps {
  num1: number
  num2: number
}

export function VisualLearning({ num1, num2 }: VisualLearningProps) {
  const [grid, setGrid] = useState<boolean[][]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const newGrid = Array(num1).fill(null).map(() => Array(num2).fill(false))
    setGrid(newGrid)
  }, [num1, num2])

  const toggleCell = (row: number, col: number) => {
    const newGrid = [...grid]
    newGrid[row][col] = !newGrid[row][col]
    setGrid(newGrid)
  }

  return (
    <div className="mb-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${num2}, 1fr)` }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 rounded-full cursor-pointer ${
                cell ? 'bg-purple-500' : 'bg-gray-200'
              }`}
              onClick={() => toggleCell(rowIndex, colIndex)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))
        )}
      </div>
      <p className="text-center mt-2">
        {t('activeCellsCount')} {grid.flat().filter(Boolean).length}
      </p>
    </div>
  )
}

