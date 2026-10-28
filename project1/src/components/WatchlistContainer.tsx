import { useState, useRef, useEffect } from 'react'
import type { CoinInterface } from '../interfaces/Coin'
import CoinsTable from './CoinsTable'
import { URL_API, URL_COINS, COINGECKO_API_KEY } from '../constants/api'

const WatchlistContainer = () => {

    const [coinsList, setCoinsList] = useState<CoinInterface[]>([])
    const [coinsListOriginal, setCoinsListOriginal] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const searchInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        fetch(`${URL_API}${URL_COINS}&x_cg_demo_api_key=${COINGECKO_API_KEY}&x_cg_demo_api_key=${COINGECKO_API_KEY}&ids=${favorites.join(',')}`)
        // CoinMarketCap API endpoint for fetching cryptocurrency listings (Blocked due to CORS policy only works in the backend)
        // fetch(
        // "https://pro-api.coinmarketcap.com/v3/cryptocurrency/listings/latest?start=1&limit=100&convert=USD",
        // {
        //     headers: {
        //         "X-CMC_PRO_API_KEY": "API_KEY" // Replace with your CoinMarketCap API key
        //     }
        // })
        .then(response => response.json())
        .then(data => {

            const formattedCoins: CoinInterface[] = data.map((coin: any) => ({
                order: coin.market_cap_rank,
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                price: coin.current_price,
                priceChange: coin.price_change_percentage_24h,
                code: coin.symbol.toUpperCase(),
                image: coin.image
            }))
            // const formattedCoins: CoinInterface[] = data.map((coin: any) => ({
            //     order: coin.cmc_rank,
            //     name: coin.name,
            //     symbol: coin.symbol,
            //     price: coin.quote.USD.price,
            //     priceChange: coin.quote.USD.percent_change_24h,
            //     code: coin.symbol
            // }))

            setCoinsList(formattedCoins)
            setCoinsListOriginal(formattedCoins)
        })
        .catch(error => {
            console.error("Error al obtener los datos de las criptomonedas:", error)
            setError("Error al obtener los datos de las criptomonedas.")
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const handleSearch = () => {
        const searchValue = searchInput?.current?.value || ""
        const newCoinsList = coinsListOriginal.filter((coin) => coin.name.toLowerCase().includes(searchValue.toLowerCase()))
        setCoinsList(newCoinsList)
    }

    const handleClearFavorites = () => {
        localStorage.removeItem("favorites");
        setCoinsList([]);
        setCoinsListOriginal([]);
    }

    if (loading) {
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
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-medium text-slate-500">{error}</p>
            </div>
        )
    }

    return (
        <>
            
            <div className="flex justify-end">
                <button onClick={handleClearFavorites} className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                Limpiar favoritos
                </button>
            </div>
            <input
                type="text"
                placeholder="Buscar criptomoneda"
                ref={searchInput}
                onChange={handleSearch}
                className="mb-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
                {coinsList.length > 0 ? (
                    <CoinsTable coins={coinsList} />
                ) : 
                (
                    <div className="flex justify-center py-10">
                        <p className="text-base text-slate-500">
                            No se encontraron criptomonedas que contengan "{searchInput.current?.value}"
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default WatchlistContainer