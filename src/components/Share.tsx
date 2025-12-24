export default function Share() {
  return (
    <div className="mt-12 text-center">
      <div className="inline-block bg-card border-2 border-accent rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-foreground mb-3">Share with Friends!</h3>
        <p className="text-muted-foreground text-sm mb-4">Scan to play on your phone</p>
        <img
          src="/xmas-mad-libs/jules-mabel-games-qr.svg"
          alt="QR Code to Christmas Mad Libs"
          className="w-48 h-48 mx-auto"
        />
      </div>
    </div>
  )
}
