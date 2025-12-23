"use client"

import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

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

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🎄</div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Oops, sorry!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            We couldn't find that page. Maybe it got lost in the snow?
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  )
}
