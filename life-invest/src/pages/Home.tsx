import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStockFromAlhpa } from "../../store/slices/stockSlice";
import { RootState } from "../../store";
import {sampleData, StockQuote} from "../../utils/data.ts"; 
import StockChart from "../components/StockChart.tsx";
import SearchInput from "../components/SearchInput.tsx";
import StockDetails from "../components/StockDetails.tsx";
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
    <body className=" bg-[#F4F5F9] h-screen" >
      <header className=" px-10 py-4 bg-white">
      <div className="w-full flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">Hello Guest</h1>
            </div>
          <SearchInput onSelectStock={(ticker: string) => handleSetTicker(ticker)} />
          </div>
      </header>
      
      <main className=" m-10">
        
        <section className=" grid grid-cols-4 gap-6 items-center ">
            <div className="stock-chart col-span-3 bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col p-4 pb-6">
        <p className=" text-2xl font-semibold ">{StockQuote["Global Quote"]["01. symbol"]}</p>
          </div>
                <StockChart 
                  data={stockChartData} 
                  symbol={sampleData['Meta Data']['2. Symbol']}
                />
            </div>
            {StockQuote && 
            <StockDetails StockQuote={StockQuote}  />
            }
        </section>
      </main>
    </body>
  )
}

export default Home