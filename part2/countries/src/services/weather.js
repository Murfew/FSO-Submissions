import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const baseUrlInfo = 'https://api.openweathermap.org/data/3.0/onecall?';
const baseUrlImg = 'https://openweathermap.org/img/wn/';

const getInfo = (lat, lon) => {
  const request = axios.get(
    `${baseUrlInfo}lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${apiKey}`
  );

  return request.then((response) => response.data);
};

const getImg = (code) => {
  const request = axios.get(`${baseUrlImg}${code}@2x.png`);
  return request.then((response) => response.data);
};

export default { getInfo, getImg };
