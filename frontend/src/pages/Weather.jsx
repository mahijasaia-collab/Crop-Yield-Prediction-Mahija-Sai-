import { useState } from "react";
import {
  FaCloudSun,
  FaMapMarkerAlt,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCloudRain,
  FaSearch,
  FaLeaf,
  FaSeedling
} from "react-icons/fa";
import { getWeather } from "../services/weatherService";
import "../styles/Weather.css";

export default function Weather() {

  const [city, setCity] = useState("");

  const [weather, setWeather] = useState(null);

const handlePredict = async () => {

  if (!city.trim()) {
    alert("Please enter a city");
    return;
  }

  try {

    const data = await getWeather(city);

    let recommendation = "";

    if (data.temperature > 35) {
      recommendation =
        "🌞 High temperature detected. Irrigate crops during morning or evening.";
    } else if (data.humidity > 80) {
      recommendation =
        "💧 High humidity. Monitor crops for fungal diseases.";
    } else if (data.wind > 10) {
      recommendation =
        "💨 Strong winds expected. Avoid pesticide spraying.";
    } else {
      recommendation =
        "🌱 Weather conditions are favorable for farming activities.";
    }

    setWeather({
      ...data,
      recommendation,
    });

  } catch (err) {
    alert(err.message);
  }

};
  return (

    <div className="weather-container">

      {/* HERO */}

      <section className="weather-hero">

        <div className="hero-left">

          <h1>

            🌦 Weather Intelligence

          </h1>

          <p>

            AI Powered Weather Monitoring for Smart Agriculture

          </p>

          <div className="search-box">

            <FaMapMarkerAlt className="search-icon"/>

            <input
              type="text"
              placeholder="Enter City / District"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
            />

            <button onClick={handlePredict}>

              <FaSearch/>

              Predict

            </button>

          </div>

        </div>

        <div className="hero-right">

          <FaCloudSun className="big-weather-icon"/>

        </div>

      </section>

      {weather && (

      <>

      {/* WEATHER CARDS */}

      <section className="weather-cards">

        <div className="card">

          <FaTemperatureHigh/>

          <h2>{weather.temperature}°C</h2>

          <span>Temperature</span>

        </div>

        <div className="card">

          <FaTint/>

          <h2>{weather.humidity}%</h2>

          <span>Humidity</span>

        </div>

        <div className="card">

    <FaCloudRain />

    <h2>

        {weather.rainfall} mm

    </h2>

    <span>

        Current Rainfall

    </span>

</div>
<div className="card">

    <FaCloudSun />

    <h2>

        {weather.cloud}%

    </h2>

    <span>

        Cloud Cover

    </span>

</div>

        <div className="card">

          <FaWind/>

          <h2>{weather.wind} km/h</h2>

          <span>Wind Speed</span>

        </div>

      </section>

      {/* DASHBOARD */}

      <section className="weather-dashboard">

        <div className="left-panel">

          <div className="forecast-card">

            <h2>

              📍 {weather.city}

            </h2>

            <h1>

              {weather.condition}

            </h1>

            <div className="forecast-details">

              <div>

                <strong>Pressure</strong>

                <p>{weather.pressure} hPa</p>

              </div>

              <div>

                <strong>UV Index</strong>

                <p>{weather.uv}</p>

              </div>

            </div>

          </div>

        </div>

        <div className="right-panel">

          <div className="ai-card">

            <h2>

              🤖 AI Recommendation

            </h2>

            <p>

              {weather.recommendation}

            </p>

          </div>

          <div className="crop-card">

            <h2>

              <FaLeaf/>

              Recommended Crops

            </h2>

            <div className="crop-tags">

              <span>Rice</span>

              <span>Maize</span>

              <span>Groundnut</span>

              <span>Millets</span>

            </div>

          </div>

          <div className="soil-card">

            <h2>

              <FaSeedling/>

              Farming Tips

            </h2>

            <ul>

              <li>✔ Soil moisture is sufficient.</li>

              <li>✔ Avoid spraying pesticides today.</li>

              <li>✔ Weather suitable for transplanting.</li>

              <li>✔ Monitor rainfall for next 24 hours.</li>

            </ul>

          </div>

        </div>

      </section>

      </>
      )}

    </div>

  );

}
