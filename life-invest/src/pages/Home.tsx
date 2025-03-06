import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStockFromAlhpa, fetchStockQuote } from "../../store/slices/stockSlice";
import { RootState } from "../../store";
import StockChart from "../components/StockChart.tsx";
import SearchInput from "../components/SearchInput.tsx";
import StockDetails from "../components/StockDetails.tsx";
import { Ticker } from "../../store/slices/types.ts";
const Home = () => {
  const { stockQuote, stockChartInfo } = useSelector((state: RootState) => state.stockReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [symbol, setSymbol] = useState<Ticker>();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStockData = async () => {
      // if (!symbol) {
      //   setLoading(false);
      //   return;
      // }
      setLoading(true);
      setError(null);
      try {
        const stockDataRes = await dispatch(fetchStockFromAlhpa("IBM") as any);
        const quote = await dispatch(fetchStockQuote("IBM") as any);
        if (stockDataRes.data && quote) {
          // show success toast?
        } else {
          //show error toast
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      } 
    };

    fetchStockData();
  }, [symbol]);
  
    const handleSetTicker = (ticker: Ticker) => {
      setSymbol(ticker);
    }

    console.log("stock data", stockChartInfo?.data);
  
  return (
  
    <body className=" bg-[#F4F5F9] h-screen" >
      <header className=" px-10 py-4 bg-white">
      <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">Hello Guest</h1>
            </div>
          <SearchInput onSelectStock={(ticker: Ticker) => handleSetTicker(ticker)} />
          </div>
      </header>
      
      <main className=" m-10">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : stockChartInfo ? (
          <section className=" grid grid-cols-4 gap-6 items-center ">
            <div className="stock-chart col-span-3 bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col p-4 pb-6">
        <p className=" text-2xl font-semibold ">{ stockQuote && stockQuote["Global Quote"]["01. symbol"]}</p>
          </div>
                <StockChart 
                  data={stockChartInfo?.data} 
                />
            </div>
            {stockQuote && 
            <StockDetails StockQuote={stockQuote}  />
            }
        </section>
        ) : (
          <p>No data available</p>
        )}

       
       
      </main>
    </body>
  )
}

export default Home