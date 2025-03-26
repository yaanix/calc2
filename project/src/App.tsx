import React, { useState } from 'react';
import { Calendar, Copy, CheckCircle } from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [resultDate, setResultDate] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);

  const addMonths = (months: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + months);
    setResultDate(newDate);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
    setResultDate(null);
  };

  const copyResult = () => {
    if (resultDate) {
      navigator.clipboard.writeText(resultDate.toLocaleDateString('ru-RU'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center p-4">
      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-semibold text-white text-center">
            Калькулятор подписок
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2">Выберите дату:</label>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[1, 3, 6, 12].map((months) => (
            <button
              key={months}
              onClick={() => addMonths(months)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              {months} {months === 1 ? 'месяц' : 'месяцев'}
            </button>
          ))}
        </div>

        {resultDate && (
          <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-white/80">Результат:</span>
              <span className="ml-2 text-white">
                {resultDate.toLocaleDateString('ru-RU')}
              </span>
            </div>
            <button
              onClick={copyResult}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;