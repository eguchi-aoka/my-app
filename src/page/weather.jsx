import { useState, useEffect } from 'react'

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  // 現在表示している日（0:今日, 1:明日, 2:明後日）を管理
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

const getBackgroundClass = (weatherText) => {
    const checkPos = (pos) => (pos === -1 ? 999 : pos);

    const sunnyPos  = checkPos(weatherText.indexOf('晴'));
    const cloudyPos = checkPos(weatherText.indexOf('くもり'));
    const rainyPos  = checkPos(weatherText.indexOf('雨'));
    const snowyPos  = checkPos(weatherText.indexOf('雪'));

    const minPos = Math.min(sunnyPos, cloudyPos, rainyPos, snowyPos);

    // 全く見つからない場合はデフォルト
    if (minPos === 999) return 'bg-default';

    if (minPos === snowyPos)  return 'bg-snowy';
    if (minPos === rainyPos)  return 'bg-rainy';
    if (minPos === cloudyPos) return 'bg-cloudy';
    if (minPos === sunnyPos)  return 'bg-sunny';

    return 'bg-default';
  };

  // 現在表示している天気のテキスト
  const currentWeather = weathers[dayIndex];

  return (
    /* 動的に背景クラスを適用 */
    <div className={`weather-container ${getBackgroundClass(currentWeather)}`}>
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
          {currentWeather}
        </p>
      </div>
    </div>
  );
}

export default Weather;