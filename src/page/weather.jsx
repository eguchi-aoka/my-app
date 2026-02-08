import { useState, useEffect } from 'react'

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  // 現在表示している日（0:今日, 1:明日, 2:明後日）を管理
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    // 気象庁のAPIから東京地方（130000）のデータを取得
    fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json')
      .then(response => response.json())
      .then(data => setWeatherData(data));
  }, []);

  // データ読み込み中の表示
  if (!weatherData) return <p>読み込み中...</p>;

  // データの抽出
  const areaName = weatherData[0].timeSeries[0].areas[0].area.name;
  const weathers = weatherData[0].timeSeries[0].areas[0].weathers;
  const dayLabels = ["今日", "明日", "明後日"];

  // ★追加：天気の文字列から背景用クラス名を決める関数
  const getBackgroundClass = (weatherText) => {
    if (weatherText.includes('晴')) return 'bg-sunny';
    if (weatherText.includes('雨')) return 'bg-rainy';
    if (weatherText.includes('雪')) return 'bg-snowy';
    if (weatherText.includes('曇')) return 'bg-cloudy';
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
            /* 選択中のボタンに active クラスを付与 */
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