import {useState} from "react";
import type { CoinInterface } from "../interfaces/Coin"
import { Link } from "react-router-dom";

const Coin = ({order, name, symbol, price, priceChange, code, image, id}: CoinInterface) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const handleToFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            const newFavorites = favorites.filter((fav: string) => fav !== id);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        } else {
            localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
        }
    }

    return (
        <tr className="border-t border-slate-200 transition-colors duration-200 hover:bg-slate-50">
            <td className="px-4 py-4 text-center text-slate-600">{order}</td>
            <td className="px-4 py-4">
                <div className="flex justify-center">
                    <Link to={`/coin/${id}`} className="flex items-center gap-3 text-left">
                        <img src={image} alt={symbol} className="h-10 w-10 rounded-full object-cover" />
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-slate-800">{symbol}</span>
                            <span className="text-sm text-slate-500">{name}</span>
                            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{code}</span>
                        </div>
                    </Link>
                </div>
            </td>
            <td className="px-4 py-4 text-center font-medium text-slate-700">{price}</td>
            <td className="px-4 py-4 text-center">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${Number(priceChange) >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {priceChange?.toFixed(3)}%
                </span>
            </td>
            <td className="px-4 py-4 text-center">
                <button
                    onClick={handleToFavorites}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        isFavorite
                            ? 'bg-slate-900 text-white shadow-sm hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                    {isFavorite ? 'Quitar' : 'Agregar'}
                </button>
            </td>
        </tr>
    )
}

export default Coin