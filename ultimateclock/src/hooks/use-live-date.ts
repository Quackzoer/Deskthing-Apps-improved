import { useEffect, useState } from "react";

export const useLiveDate = (): Date => {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    // align to the next whole minute so the tick is always timely
    const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000;
    const timeout = setTimeout(() => {
      setDate(new Date());
      const interval = setInterval(() => setDate(new Date()), 60_000);
      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return date;
};