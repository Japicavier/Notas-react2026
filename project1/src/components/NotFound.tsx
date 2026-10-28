const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex w-full max-w-xl flex-col items-center rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-4xl shadow-lg shadow-slate-200">
          🧠
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          Error 404
        </p>
        <h1 className="text-5xl font-black tracking-tight text-slate-900">Crypto Lost</h1>

        <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
          Esta ruta no existe en la blockchain. Parece que te perdiste en una red sin transacciones.
        </p>

        <div className="mt-8 flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Sin conexión con la wallet
        </div>

        <button
          type="button"
          className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default NotFound