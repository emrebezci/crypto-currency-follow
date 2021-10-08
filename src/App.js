import axios from "axios";
import React, { useState, useEffect } from 'react';


function App() {

  const [crypto, setCrypto] = useState([])
  const [search, setSearch] =useState('')
  useEffect(() => {
    const fetchCrypto = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    axios.get(fetchCrypto).then(
      res => {
        // console.log(res.data)
        setCrypto(res.data)
      }
    ).catch(error => console.log(error))
  }, [])

  
  const handleChange = e => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }




  return (
    <div className="App">
      <form>
        <input type="text" id="searchInput" onChange={handleChange}></input>
      </form>

      {crypto.filter((coin) => {
        if (search == "") {
          return coin
        } else if (coin.name.toLowerCase().includes(search.toLowerCase()))
        return coin
      }).map((coin =>
        <table key={coin.id} className="table">
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24H-High</th>
            <th>24H-Low</th>
            <th>24H-Change %</th>
          </tr>
          <tr>
            <td><img src={coin.image} alt={coin.id}></img></td>
            <td>{coin.name}</td>
            <td>{coin.current_price}</td>
            <td>{coin.market_cap}</td>
            <td>{coin.high_24h}</td>
            <td>{coin.low_24h}</td>
            <td>% {coin.price_change_percentage_24h}</td>
          </tr>
        </table>
      ))}
      
      
      
    </div>
  );
}

export default App;
