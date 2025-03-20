import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is CalcHub?",
      answer: "CalcHub is a comprehensive mathematics platform that provides various calculators, graphing tools, and educational resources to help users solve and understand mathematical problems."
    },
    {
      question: "Is CalcHub free to use?",
      answer: "Yes, CalcHub is completely free to use. We believe in making mathematical tools accessible to everyone."
    },
    {
      question: "What types of calculators are available?",
      answer: "CalcHub offers a wide range of calculators including basic calculator, scientific calculator, graphing calculator, equation solver, and specialized calculators for physics and engineering calculations."
    },
    {
      question: "Can I use CalcHub offline?",
      answer: "Currently, CalcHub requires an internet connection to function. However, we are working on implementing offline capabilities in future updates."
    },
    {
      question: "How accurate are the calculations?",
      answer: "CalcHub uses high-precision mathematics libraries and follows standard mathematical rules to ensure accurate calculations. For complex calculations, results are typically accurate to 8-10 decimal places."
    },
    {
      question: "Can I save my calculations?",
      answer: "Yes, most calculators in CalcHub have a history feature that saves your recent calculations. Some tools also allow you to export your work."
    },
    {
      question: "Is there a mobile app available?",
      answer: "CalcHub is a progressive web app (PWA) that works on all devices through your web browser. You can add it to your home screen for quick access."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Frequently Asked Questions
      </h1>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="bg-butterfly-blue-900/30 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50 overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-butterfly-blue-800/30 transition-colors duration-200"
              onClick={() => setOpenItem(openItem === index ? null : index)}
            >
              <span className="font-medium text-white">{item.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  openItem === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {openItem === index && (
              <div className="px-6 py-4 border-t border-butterfly-blue-700/50 text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-gray-400">
        <p>Don't see your question here? <a href="/contact" className="text-butterfly-purple-400 hover:text-butterfly-purple-300">Contact us</a></p>
      </div>
    </div>
  );
};

export default FAQ; 