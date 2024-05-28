'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Time = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('h:mm:ss A'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('h:mm:ss A'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <p className="text-xs text-gray-200/50" suppressHydrationWarning>
      {currentTime}
    </p>
  );
};

export default Time;
