"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import madlibsData from "../../src/data/madlibs.json"
import type { MadLibTemplate } from "../../src/lib/types"
import { saveMadLib, getMadLib, deleteMadLib } from "../../src/lib/storage"

export default async function WordEntry({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <WordEntryClient id={id} />
}

function WordEntryClient({ id }: { id: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showingHelp, setShowingHelp] = useState<string | null>(null)

  const template = madlibsData.templates.find((t: MadLibTemplate) => t.id === id) as MadLibTemplate | undefined

  useEffect(() => {
    if (!template) {
      router.push("/404")
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
  }, [id, template, router])

  if (!template) {
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
      router.push(`/${id}/view`)
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
      {/* Header */}
      <header className="relative bg-secondary py-3 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary" />

        <div className="relative flex items-center justify-center">
          <div className="bg-card border-4 border-accent shadow-2xl rounded-2xl px-8 py-4 -mt-2 mb-2 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Mad Libs</h1>

              <div className="text-secondary text-2xl md:text-3xl">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                  <path d="M12 2L9 8h2l-2 5h2l-3 7h8l-3-7h2l-2-5h2l-3-6z" />
                </svg>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary">Christmas</h1>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
      </header>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4 md:p-8 pb-32">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <button onClick={() => router.push("/")} className="text-primary hover:underline mb-4">
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
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <label htmlFor={word.id} className="font-semibold text-secondary">
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
                        stroke="currentColor"
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
                      className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
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
