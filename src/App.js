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
      <ul>
        {countries.map((item, index) => {
          return (
            <li   key={index}>
            <div>
              <img src={item.flags.svg} alt={item.name}/>
              {item.name.common} | {item.region} | {item.population}
            </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
