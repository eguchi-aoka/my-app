import { useState, useEffect } from 'react'

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json')
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, []);

  if (!weatherData) return <p>読み込み中...</p>;

  const areaName = weatherData[0].timeSeries[0].areas[0].area.name;
  const weathers = weatherData[0].timeSeries[0].areas[0].weathers;
  const dayLabels = ["今日", "明日", "明後日"];

  return (
    <div className="weather-container">
      <h1 className="weather-title">{areaName}の天気</h1>

      <div className="button-group">
        {dayLabels.map((label, index) => (
          <button
            key={label}
            onClick={() => setDayIndex(index)}
            className={`tab-button ${dayIndex === index ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="weather-display">
        <h2 className="day-label">{dayLabels[dayIndex]}の予報</h2>
        <p className="weather-text">
          {weathers[dayIndex]}
        </p>
      </div>
    </div>
  );
}

export default Weather;