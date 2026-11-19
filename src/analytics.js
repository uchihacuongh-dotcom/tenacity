import ReactGA from 'react-ga4';

import { PLANETS } from './game/missions.js';

// Tắt thống kê của bản gốc để không gửi dữ liệu về tác giả

const logAnalytics = false;

export const getMissionLabel = (planetIndex, missionIndex) => {
  return `${PLANETS[planetIndex].name}, Mission ${missionIndex + 1}`;
}

export const logPageview = () => {
  if (logAnalytics) {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search
    });
  }
}

export const logEvent = (event) => {
  if (logAnalytics) {
    ReactGA.event(event);
  }
}
