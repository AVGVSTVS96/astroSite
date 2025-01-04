import React, { useEffect, useState } from 'react';

const StartupTime: React.FC = () => {
  const [startupTime, setStartupTime] = useState<string>('...');

  useEffect(() => {
    const timeNow = performance.now().toFixed(0);
    setStartupTime(timeNow);
  }, []);

  return (
    <code className="text-muted-foreground mb-2 text-[10px]">
      React started in {startupTime}ms
    </code>
  );
};

export default StartupTime;
