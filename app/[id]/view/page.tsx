"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import madlibsData from "../../../src/data/madlibs.json"
import type { MadLibTemplate } from "../../../src/lib/types"
import { getMadLib } from "../../../src/lib/storage"

export default async function Results({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <ResultsClient id={id} />
}

function ResultsClient({ id }: { id: string }) {
  const router = useRouter()
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const template = madlibsData.templates.find((t: MadLibTemplate) => t.id === id) as MadLibTemplate | undefined

  useEffect(() => {
    if (!template) {
      router.push("/404")
      return
    }

    const savedData = getMadLib(id)
    if (!savedData) {
      router.push(`/${id}`)
    }
  }, [id, template, router])

  if (!template) {
    return null
  }

  const savedData = getMadLib(id)
  if (!savedData) {
    return null
  }

  let filledTemplate = template.template
  template.expectedWords.forEach((word) => {
    const regex = new RegExp(`{{${word.id}}}`, "g")
    const replacement = `<span class="word-replacement" data-word-id="${word.id}" data-word-label="${word.label}">${savedData[word.id]}</span>`
    filledTemplate = filledTemplate.replace(regex, replacement)
  })

  const paragraphs = filledTemplate.split("\n")

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

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button onClick={() => router.push("/")} className="text-primary hover:underline mb-4">
              ← Back to home
            </button>
            <h2 className="text-3xl font-bold text-foreground mb-2">{template.name}</h2>
          </div>

          <div className="bg-card border-2 border-accent rounded-xl shadow-xl p-6 md:p-10">
            <div className="prose max-w-none space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-foreground"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement
                    if (target.classList.contains("word-replacement")) {
                      const wordId = target.dataset.wordId
                      setHoveredWord(wordId === hoveredWord ? null : wordId!)
                    }
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement
                    if (target.classList.contains("word-replacement")) {
                      setHoveredWord(target.dataset.wordId!)
                    }
                  }}
                  onMouseLeave={() => setHoveredWord(null)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => router.push(`/${id}`)}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Edit Answers
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Choose Another
            </button>
          </div>

          {hoveredWord && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold z-50">
              {template.expectedWords.find((w) => w.id === hoveredWord)?.label}
            </div>
          )}
        </div>

        <style>{`
          .word-replacement {
            font-weight: 700;
            color: var(--color-primary);
            cursor: pointer;
            position: relative;
            padding: 0 2px;
            transition: all 0.2s;
          }
          .word-replacement:hover {
            background-color: var(--color-accent);
            color: var(--color-accent-foreground);
            border-radius: 4px;
          }
        `}</style>
      </div>
    </>
  )
}
