import Coin from './Coin'
import type { CoinInterface } from '../interfaces/Coin'

const CoinsTable = ({ coins }: { coins: CoinInterface[] }) => {

    return (
        <table className="min-w-full border-collapse text-center text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600">
                <tr>
                    <th className="px-4 py-3 text-center font-semibold">Orden</th>
                    <th className="px-4 py-3 text-center font-semibold">Nombre</th>
                    <th className="px-4 py-3 text-center font-semibold">Precio</th>
                    <th className="px-4 py-3 text-center font-semibold">Cambio</th>
                    <th className="px-4 py-3 text-center font-semibold">Favorito</th>
                </tr>
            </thead>
            <tbody>
                {coins.map((coin) => (
                    <Coin
                        key={coin.order}
                        order={coin.order}
                        name={coin.name}
                        symbol={coin.symbol}
                        price={coin.price}
                        priceChange={coin.priceChange}
                        code={coin.code}
                        image={coin.image}
                        id={coin.id}
                    />
                ))}
            </tbody>
        </table>
    )  
}

export default CoinsTable