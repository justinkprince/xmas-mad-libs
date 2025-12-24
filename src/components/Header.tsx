export default function Header() {
  return (
    <header className="relative bg-secondary py-3 pt-6 shadow-lg">
      <div className="absolute inset-0 bg-linear-to-b from-secondary/50 to-secondary" />

      <div className="relative flex items-center justify-center">
        <div className="bg-card border-4 border-accent shadow-2xl rounded-2xl px-8 py-4 -mt-2 mb-2 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Jules</h1>

            {/* Christmas Tree Separator */}
            <div className="text-accent text-4xl md:text-3xl">
              &amp;
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary">Mabel</h1>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
    </header>
  )
}
