import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchStockFromAlhpa } from "../../store/slices/stockSlice";
import { RootState } from "../../store";

const Home = () => {
  const { stockDetail } = useSelector((state: RootState) => state.stockReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const ticker = "AAPL";
    dispatch(fetchStockFromAlhpa(ticker) as any);
  }, [dispatch]);  

  // const timeSeriesData = stockDetail && stockDetail['Time Series (Daily)'] ? stockDetail['Time Series (Daily)'] : null;
  // const metaData = stockDetail && stockDetail['Meta Data'] ? stockDetail['Meta Data'] : null;
  
  // console.log("Time Series Data:", timeSeriesData);
  
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <p>About</p>
      </nav>
    </div>
  )
}

export default Home