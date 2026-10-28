import { useState, useRef, useEffect } from 'react'
import type { CoinInterface } from '../interfaces/Coin'
import CoinsTable from './CoinsTable'
import { URL_API, URL_COINS, COINGECKO_API_KEY } from '../constants/api'
import Spinner from './Spinner'

const CoinsContainer = () => {

    const [coinsList, setCoinsList] = useState<CoinInterface[]>([])
    const [coinsListOriginal, setCoinsListOriginal] = useState<CoinInterface[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const searchInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch(`${URL_API}${URL_COINS}&x_cg_demo_api_key=${COINGECKO_API_KEY}`)
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
                image: coin.image,
                id: coin.id,
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

    if (loading) {
        return (
            <Spinner />
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
                ) : (
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

export default CoinsContainer