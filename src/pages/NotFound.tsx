import { useNavigate } from "react-router-dom"
import Snowfall from "react-snowfall";
import Header from "../components/Header"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <Snowfall />
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold text-primary mb-4">404</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! This Mad Lib doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  )
}
