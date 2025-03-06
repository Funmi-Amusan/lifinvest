import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStockFromAlhpa } from "../../store/slices/stockSlice";
import { RootState } from "../../store";
import {sampleData, StockQuote} from "../../utils/data.ts"; 
import StockChart from "../components/StockChart.tsx";
import SearchInput from "../components/SearchInput.tsx";
const Home = () => {
  const {  stockQuote } = useSelector((state: RootState) => state.stockReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [symbol, setSymbol] = useState<string>("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await dispatch(fetchStockFromAlhpa(symbol) as any);
        if (response.data) {
          setStockData(response.data);
        } else {
          setError(response.error);
          setStockData(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setStockData(null);
      } 
    };

    fetchStockData();
  }, [symbol, dispatch]);
  
  const stockChartData = [];
  for (const [key, value] of Object.entries(sampleData['Time Series (Daily)'])) {
      const time = new Date(key).getTime()
      const price = Number(value['4. close'])
      stockChartData.push({time, price})
    }

    const handleSetTicker = (ticker: string) => {
      setSymbol(ticker);
    }

    console.log("ticker", symbol);
  
  return (
    <body  >
      <header className=" px-10 py-4 bg-black/10">
      <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">Hello Guest</h1>
            </div>
          <SearchInput onSelectStock={(ticker: string) => handleSetTicker(ticker)} />
          </div>
      </header>
      
      <main className=" m-10">
        
        <section className="items-center">
          <div className="flex flex-col p-4 text-2xl text-center py-6">
        <p>{StockQuote["Global Quote"]["01. symbol"]} Stocks</p>
          </div>
            <div className="stock-chart">
                <StockChart 
                  data={stockChartData} 
                  symbol={sampleData['Meta Data']['2. Symbol']}
                />
            </div>
            <div className=" grid grid-flow-col gap-4">
              <div className="flex flex-col gap-4 bg-white p-4 w-fit">
                <p className=" text-sm text-zinc-500 font-normal">Open</p>
                <p className=" text-md text-black font-normal">{StockQuote["Global Quote"]['02. open']}</p>
              </div>
              <div className="flex flex-col gap-4 bg-white p-4 w-fit">
                <p className=" text-sm text-zinc-500 font-normal">High</p>
                <p className=" text-md text-black font-normal">{StockQuote["Global Quote"]['03. high']}</p>
              </div>
              <div className="flex flex-col gap-4 bg-white p-4 w-fit">
                <p className=" text-sm text-zinc-500 font-normal">Low</p>
                <p className=" text-md text-black font-normal">{StockQuote["Global Quote"]['04. low']}</p>
              </div>
              <div className="flex flex-col gap-4 bg-white p-4 w-fit">
                <p className=" text-sm text-zinc-500 font-normal">Open</p>
                <p className=" text-md text-black font-normal">{StockQuote["Global Quote"]['05. price']}</p>
              </div>
            </div>
        </section>
      </main>
    </body>
  )
}

export default Home