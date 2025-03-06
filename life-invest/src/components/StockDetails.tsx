import { StockQuoteType } from '../../store/slices/types'

const StockDetails = ({StockQuote}: {StockQuote: StockQuoteType}) => {
  console.log(StockQuote)
  return (
      <div className=" col-span-1 h-full bg-white rounded-xl shadow-lg p-4 ">
                  <div className=" flex justify-between items-center">
                  <h2 className=" font-bold">Details</h2>
                  <p className=" bg-[#F4F5F9] p-2 rounded-lg font-semibold">Today</p>
                  </div>
                  <div className="flex flex-col my-6 gap-2">
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Open</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['02. open']}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">High</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['03. high']}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Low</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['04. low']}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Price</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['05. price']}</p>
                    </div>
                    <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Volume</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['06. volume']}</p>
                    </div>
                    <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Latest Trading Day</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['07. latest trading day']}</p>
                    </div>
                    <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Previous Close</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['08. previous close']}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Change</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['09. change']}</p>
                  </div>
                  <div className="flex justify-between ">
                    <p className=" text-sm text-zinc-500 font-normal">Change Percentage</p>
                    <p className=" text-md text-black font-medium">{StockQuote["Global Quote"]['10. change percent']}</p>
                  </div>
                 </div>
                 </div>
  )
}

export default StockDetails