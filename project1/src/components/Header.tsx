import { Link } from 'react-router-dom'

const Header = () => (
  <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
            <img
            src="/skull.jfif"
            alt="Logo"
            className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200"
            />
        </Link>
        <span className="text-lg font-semibold tracking-tight text-slate-800">
          Cripto
        </span>
      </div>

      <nav className="flex items-center gap-8 text-sm font-medium text-slate-600">
        <Link to="/" className="transition hover:text-slate-900">
          Overview
        </Link>
        <Link to="/watchlist" className="transition hover:text-slate-900">
          Watchlist
        </Link>
      </nav>
    </div>
  </header>
)

export default Header