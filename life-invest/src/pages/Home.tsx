import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStockFromAlhpa } from "../../store/slices/stockSlice";
import { RootState } from "../../store";
import {sampleData} from "../../utils/data.ts"; 
import StockChart from "../components/StockChart.tsx";
import SearchInput from "../components/SearchInput.tsx";
const Home = () => {
  const { stockDetail } = useSelector((state: RootState) => state.stockReducer);
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
    <div >
      <header className="h-10 bg-black/10">
      </header>
      
      <main className="main-content">
        
        <section className="content">
          {/* add search input */}
          <SearchInput onSelectStock={(ticker: string) => handleSetTicker(ticker)} />
{/* info about the company of the symbol? */}
            <div className="stock-chart">
              {/* stock chart */}
                <StockChart 
                  data={stockChartData} 
                  symbol={sampleData['Meta Data']['2. Symbol']}
                />
            </div>
        </section>
      </main>
    </div>
  )
}

export default Home