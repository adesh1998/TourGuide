import React, { createContext, useState } from 'react';

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <UserLocationContext.Provider value={{ location, setLocation, destination, setDestination }}>
      {children}
    </UserLocationContext.Provider>
  );
};
