import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [word, setWord] = useState("");
  const [dataFilter] = useState(["name","capital"]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      });
  }, []);

  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

  const searchCountries = (countries) => {
    return countries.filter((item) => {
      return dataFilter.some((filter) => {
        if (filter === "name" && item.name && item.name.common) {
          // ตรวจสอบว่าค่าใน item.name.common เป็นสตริงหรือไม่
          return item.name.common.toLowerCase().includes(word.toLowerCase());
        }
        if (filter === "capital" && item.capital && Array.isArray(item.capital)) {
          // ตรวจสอบว่าเมืองหลวงเป็นอาร์เรย์และค้นหาในค่าแรกของอาร์เรย์
          return item.capital[0]?.toLowerCase().includes(word.toLowerCase());
        }
        return false;
      });
    });
  };

  return (
    <div className="container">
      <div className="search-container">
        <label htmlFor="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search for countries by name or capital city"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </label>
      </div>
      <ul className="row">
        {searchCountries(countries).map((item, index) => {
          return (
            <li key={index}>
              <div className="card">
                <div className="card-title">
                  <img src={item.flags.svg} alt={item.name} />
                </div>
                <div className="card-body">
                  <div className="card-description">
                    <h2>{item.name.common}</h2>
                    <ol className="card-list">
                      <li>
                        Population : <span>{formatNumber(item.population)}</span>
                      </li>
                      <li>
                        Region : <span>{item.region}</span>
                      </li>
                      <li>
                        Capital City : <span>{item.capital}</span>
                      </li>
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
