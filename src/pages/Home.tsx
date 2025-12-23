import { useState } from "react"
import { useNavigate } from "react-router-dom"
import madlibsData from "../data/madlibs.json"
import type { MadLibTemplate } from "../lib/types"
import { hasMadLib } from "../lib/storage"
import Header from "../components/Header"

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const navigate = useNavigate()
  const templates = madlibsData.templates as MadLibTemplate[]

  const handleCardClick = (id: string) => {
    setSelectedId(id === selectedId ? null : id)
  }

  const handleBackdropClick = () => {
    setSelectedId(null)
  }

  const handlePlay = (id: string) => {
    navigate(`/${id}`)
  }

  const handleRead = (id: string) => {
    navigate(`/${id}/view`)
  }

  return (
    <>
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Choose Your Story</h2>
            <p className="text-lg text-muted-foreground">Select a Mad Lib to create your own silly Christmas tale!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const isSelected = selectedId === template.id
              const isCompleted = hasMadLib(template.id)

              return (
                <div key={template.id} className={`relative ${isSelected ? "z-50" : "z-0"}`}>
                  {isSelected && (
                    <div
                      className="fixed inset-0 bg-foreground/50 backdrop-blur-sm transition-opacity"
                      onClick={handleBackdropClick}
                    />
                  )}

                  <div
                    className={`bg-card border-2 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md scale-110 border-accent"
                        : "border-border hover:border-accent hover:shadow-xl"
                    }`}
                    onClick={() => !isSelected && handleCardClick(template.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground pr-2">{template.name}</h3>
                        {isCompleted && (
                          <span className="flex-shrink-0 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                            ✓ Done
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{template.description}</p>

                      {isSelected && (
                        <div className="mt-6 flex gap-3 animate-in fade-in duration-300">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePlay(template.id)
                            }}
                            className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                          >
                            Play
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRead(template.id)
                            }}
                            disabled={!isCompleted}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-opacity ${
                              isCompleted
                                ? "bg-secondary text-secondary-foreground hover:opacity-90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                          >
                            Read
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
