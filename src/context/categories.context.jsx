import { createContext, useState, useEffect} from "react";

import { getCategoriesAndDocuments } from "../routes/utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({children})=>{
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCategoriesMap = async () => {
           const categoriesMap = await getCategoriesAndDocuments();
           setCategoriesMap(categoriesMap);
        }
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}