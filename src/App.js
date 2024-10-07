import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container">
      <ul className='row'>
        {countries.map((item, index) => {
          return (
            <li   key={index}>
            <div  className='card'>
              <div className='card-title'>
              <img src={item.flags.svg} alt={item.name}/>
              </div>
              <div className='card-body'>
            <div className='card-description'>
              <h2>{item.name.common}</h2>
              <ol className='card-list'>
                <li>Population : <span>{item.population}</span></li>
                <li>Region : <span>{item.region}</span></li>
                <li>Capital City : <span>{item.capital}</span></li>
              </ol>
            </div>

              </div>
            </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
