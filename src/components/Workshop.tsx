import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

interface WorkshopProps {
  onExit: () => void
  level: number
}

export function Workshop({ onExit, level }: WorkshopProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [isTextComplete, setIsTextComplete] = useState(false)

  const workshopContent = [
    [
      "Welcome to the Health Workshop! Today, we'll learn about making smart choices when purchasing items.",
      "When shopping, it's important to check the ingredients list on products.",
      "Look for items with fewer processed ingredients and more whole foods.",
      "Remember, the order of ingredients matters - they're listed from most to least abundant.",
      "That's all for today. Practice these tips on your next shopping trip!",
    ],
    [
      "Welcome back to the Health Workshop! Let's dive deeper into reading nutrition labels.",
      "In addition to ingredients, pay attention to serving sizes and nutritional values.",
      "Look for products low in added sugars, saturated fats, and sodium.",
      "Compare similar products to find the healthiest option.",
      "Check for essential nutrients like fiber, vitamins, and minerals.",
      "Be wary of health claims on packaging - always verify with the nutrition facts.",
      "Great job! You're becoming a savvy health-conscious shopper!",
    ],
    [
      "Welcome to the advanced Health Workshop! Today, we'll master the art of healthy shopping.",
      "Start by planning your meals and making a shopping list to avoid impulse purchases.",
      "When reading ingredients, watch out for different names for sugar and unhealthy fats.",
      "For packaged foods, use the 5-20 rule: 5% DV or less is low, 20% DV or more is high.",
      "Consider the degree of processing - choose minimally processed foods when possible.",
      "Look for third-party certifications like organic, non-GMO, or fair trade if they align with your values.",
      "Don't forget about non-food items - choose cleaning and personal care products with safer ingredients.",
      "Remember to balance nutrition with your budget - frozen fruits and vegetables can be cost-effective and nutritious.",
      "Congratulations! You're now equipped to make informed, healthy choices while shopping!",
    ],
  ]

  useEffect(() => {
    const content = workshopContent[Math.min(level - 1, workshopContent.length - 1)]
    setDisplayedText([content[0]])
    setCurrentLine(1)
  }, [level])

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && currentLine < workshopContent[Math.min(level - 1, workshopContent.length - 1)].length) {
      setDisplayedText(prev => [...prev, workshopContent[Math.min(level - 1, workshopContent.length - 1)][currentLine]])
      setCurrentLine(prev => prev + 1)
    }
    if (currentLine === workshopContent[Math.min(level - 1, workshopContent.length - 1)].length) {
      setIsTextComplete(true)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentLine, level])

  return (
    <div className="absolute inset-0 bg-yellow-100 p-4 flex flex-col">
      <div className="flex-grow grid grid-cols-3 gap-4">
        {/* Speaker's platform */}
        <div className="col-span-3 h-32 bg-brown-300 rounded-lg flex items-center justify-center relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-brown-400 rounded-t-lg"></div>
          <div className="z-10 text-2xl font-bold">👨‍🏫 Workshop Speaker</div>
        </div>

        {/* Seating area */}
        <div className="col-span-3 grid grid-cols-5 gap-2">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="bg-blue-200 rounded-lg h-12 flex items-center justify-center">
              {index === 7 ? '🧑' : '💺'}
            </div>
          ))}
        </div>

        {/* Text display area */}
        <div className="col-span-3 bg-white rounded-lg p-4 shadow-md">
          <ScrollArea className="h-48">
            {displayedText.map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </ScrollArea>
          {!isTextComplete && (
            <p className="text-gray-500 mt-2">Press Enter to continue...</p>
          )}
        </div>
      </div>

      {/* Exit button */}
      {isTextComplete && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={onExit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Exit Workshop
          </Button>
        </div>
      )}
    </div>
  )
}