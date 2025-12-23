import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import madlibsData from "../data/madlibs.json"
import type { MadLibTemplate } from "../lib/types"
import { getMadLib } from "../lib/storage"
import Header from "../components/Header"

export default function Results() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const template = madlibsData.templates.find((t: MadLibTemplate) => t.id === id) as MadLibTemplate | undefined

  useEffect(() => {
    if (!template || !id) {
      navigate("/404")
      return
    }

    const savedData = getMadLib(id)
    if (!savedData) {
      navigate(`/${id}`)
    }
  }, [id, template, navigate])

  if (!template || !id) {
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
      <Header />

      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button onClick={() => navigate("/")} className="text-primary hover:underline mb-4">
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
              onClick={() => navigate(`/${id}`)}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Edit Answers
            </button>
            <button
              onClick={() => navigate("/")}
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
