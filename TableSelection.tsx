import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface TableSelectionProps {
  onSelect: (table: number | null) => void
  mode: string
}

export function TableSelection({ onSelect, mode }: TableSelectionProps) {
  const { t } = useTranslation()
  const [selectedTable, setSelectedTable] = useState<number | null>(null)

  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 text-purple-600">{t('selectMultiplicationTable')}</h2>
      <div className="grid grid-cols-3 gap-2">
        {tables.map((table) => (
          <motion.div key={table} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setSelectedTable(table)}
              className={`w-full ${selectedTable === table ? 'bg-purple-600' : 'bg-purple-400'}`}
            >
              {table}
            </Button>
          </motion.div>
        ))}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setSelectedTable(null)}
            className={`w-full ${selectedTable === null ? 'bg-purple-600' : 'bg-purple-400'}`}
          >
            {t('mixed')}
          </Button>
        </motion.div>
      </div>
      {selectedTable !== undefined && (
        <Button onClick={() => onSelect(selectedTable)} className="w-full mt-4">
          {mode} {t('startPractice')} {selectedTable ? `(${selectedTable} ${t('selectedTable')})` : `(${t('mixed')})`}
        </Button>
      )}
    </div>
  )
}

