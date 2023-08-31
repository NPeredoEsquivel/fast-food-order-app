import React, { useState } from "react";

const ModalContext = React.createContext({
  isModalVisible: false,
  toggleModalOn: () => {},
  toggleModalOff: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [isModalVisible, setIsVisible] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        toggleModalOn: () => setIsVisible(true),
        toggleModalOff: () => setIsVisible(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
