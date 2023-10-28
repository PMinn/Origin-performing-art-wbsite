import { useEffect, useState, useContext } from "react";
import { createContext } from 'react';

const SetContext = createContext();

export default function Settings({ children, value }) {
    return <SetContext.Provider value={value}>{children}</SetContext.Provider>;
}

export function useSettings() {
    return useContext(SetContext);
};