const Spinner = () => {
    return (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col items-center gap-3">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
                    <div className="absolute inset-2 animate-spin rounded-full border-4 border-slate-100 border-t-slate-400 [animation-direction:reverse] [animation-duration:1.2s]" />
                </div>
                <p className="text-sm font-medium text-slate-500">Cargando criptomonedas...</p>
            </div>
        </div>
    )}

export default Spinner