import { createContext, useState } from 'react';
import type {SetStateAction, Dispatch, ReactNode} from "react";
import type Set from '~/types/Set';


export interface SetsContextInterface {
    setsData: Set[]
    setSetsData: Dispatch<SetStateAction<Set[]>>
    removedSets: Set[]
    setRemovedSets: Dispatch<SetStateAction<Set[]>>
}

const defaultSetsContext = {
    setsData: [],
    setSetsData: (setsData: Set[]) => [],
    removedSets: [],
    setRemovedSets: (setsData: Set[]) => []
} as SetsContextInterface;

export const SetsContext = createContext<SetsContextInterface>(defaultSetsContext)

type setsProviderProps = {
    children: ReactNode
}

const SetsDataProvider = ({children} : setsProviderProps) => {
    const [setsData, setSetsData] = useState<Set[]>([]);
    const [removedSets, setRemovedSets] = useState<Set[]>([])
    return (
        <SetsContext.Provider value={{setsData, removedSets, setRemovedSets, setSetsData}}>
            {children}
        </SetsContext.Provider>
    )
}

export default SetsDataProvider;
