import React, { createContext, useState, useMemo } from "react";

export const ClockContext = createContext();

export const ClockProvider = React.memo(({ children }) => {
  const [time, setTime] = useState(0);
  const [step, setStep] = useState(16);
  const value = useMemo(() => ({ time, setTime, step, setStep }), [time, setTime, step, setStep]);

  return (
    <ClockContext.Provider value={value}>
      {children}
    </ClockContext.Provider>
  );
});
