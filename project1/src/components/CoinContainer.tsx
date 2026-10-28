import { useEffect, useState } from "react"
import { URL_API, URL_COINS, COINGECKO_API_KEY } from "../constants/api"
import { useParams } from "react-router-dom"
import type { CoinFullInterface } from "../interfaces/Coin"
import Spinner from "./Spinner"
import NotFound from "./NotFound"

const CoinContainer = () => {
    const [coin, setCoin] = useState<CoinFullInterface | null>(null)
    const { id } = useParams()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(`${URL_API}${URL_COINS}&x_cg_demo_api_key=${COINGECKO_API_KEY}&ids=${id}`)
        .then(response => response.json())
        .then(data => { 
            setLoading(false)
            setCoin(data[0]) 
        })
        .catch(error => {
            console.error("Error al obtener los datos de la criptomoneda:", error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return   <Spinner />
    }

    if (!coin) {
        return (
            <NotFound />
        )
    }

    return (
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <img src={coin.image} alt={coin.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-100" />
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{coin.name}</h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{coin.symbol}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-slate-600">
                        Rank #{coin.market_cap_rank || 'N/A'}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Precio</p>
                    <p className="mt-2 text-xl font-semibold text-slate-800">${coin.current_price}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Market Cap</p>
                    <p className="mt-2 text-xl font-semibold text-slate-800">${coin.market_cap.toLocaleString()}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Volumen 24h</p>
                    <p className="mt-2 text-xl font-semibold text-slate-800">${coin.total_volume.toLocaleString()}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Precio 24h</p>
                    <p className="mt-2 text-xl font-semibold text-slate-800">${coin.high_24h}</p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Máximo 24h</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">${coin.high_24h}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mínimo 24h</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">${coin.low_24h}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Circulating</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">{coin.circulating_supply?.toLocaleString()} {coin.symbol.toUpperCase()}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Max Supply</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">{coin.max_supply ? `${coin.max_supply.toLocaleString()} ${coin.symbol.toUpperCase()}` : 'N/A'}</p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">ATH</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">${coin.ath}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">ATL</p>
                    <p className="mt-2 text-lg font-semibold text-slate-800">${coin.atl}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Última actualización</p>
                    <p className="mt-2 text-sm font-medium text-slate-700">{new Date(coin.last_updated).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )

}

export default CoinContainer