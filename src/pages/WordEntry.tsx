import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Snowfall from "react-snowfall";
import madlibsData from "../data/madlibs.json"
import type { MadLibTemplate } from "../lib/types"
import { saveMadLib, getMadLib, deleteMadLib } from "../lib/storage"
import Header from "../components/Header"
import Share from "../components/Share"

export default function WordEntry() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showingHelp, setShowingHelp] = useState<string | null>(null)

  const template = madlibsData.templates.find((t: MadLibTemplate) => t.id === id) as MadLibTemplate | undefined

  useEffect(() => {
    if (!template || !id) {
      navigate("/404")
      return
    }

    const savedData = getMadLib(id)
    if (savedData) {
      setFormData(savedData)
    } else {
      const initialData: Record<string, string> = {}
      template.expectedWords.forEach((word) => {
        initialData[word.id] = ""
      })
      setFormData(initialData)
    }
  }, [id, template, navigate])

  if (!template || !id) {
    return null
  }

  const handleInputChange = (wordId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [wordId]: value,
    }))
  }

  const isFormValid = template.expectedWords.every((word) => formData[word.id]?.trim() !== "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      saveMadLib(id, formData)
      navigate(`/${id}/view`)
    }
  }

  const handleReset = () => {
    setShowConfirm(true)
  }

  const confirmReset = () => {
    deleteMadLib(id)
    const initialData: Record<string, string> = {}
    template.expectedWords.forEach((word) => {
      initialData[word.id] = ""
    })
    setFormData(initialData)
    setShowConfirm(false)
  }

  return (
    <>
      <Snowfall />
      <Header />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 md:pb-24 pb-32">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <button onClick={() => navigate("/")} className="text-primary hover:underline mb-4">
                ← Back to home
              </button>
              <h2 className="text-3xl font-bold text-foreground mb-2">{template.name}</h2>
              <p className="text-muted-foreground">{template.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {template.expectedWords.map((word) => (
                <div
                  key={word.id}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex items-center gap-2 min-w-45">
                    <label htmlFor={word.id} className="font-semibold text-secondary-foreground">
                      {word.label}:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowingHelp(showingHelp === word.id ? null : word.id)}
                      className="relative text-accent hover:text-primary transition-colors"
                      aria-label="Show example"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      id={word.id}
                      type="text"
                      value={formData[word.id] || ""}
                      onChange={(e) => handleInputChange(word.id, e.target.value)}
                      className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-secondary-foreground"
                      placeholder={`Enter a ${word.label.toLowerCase()}`}
                      required
                    />
                    {showingHelp === word.id && (word as any).example && (
                      <div className="absolute z-10 top-full mt-2 left-0 right-0 bg-accent text-accent-foreground p-3 rounded-lg shadow-lg text-sm">
                        {(word as any).example}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </form>

            <Share />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border shadow-lg">
          <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isFormValid
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl shadow-2xl p-6 max-w-md w-full border-2 border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">Reset Mad Lib?</h3>
              <p className="text-muted-foreground mb-6">
                This will clear all your answers and remove the saved data. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
