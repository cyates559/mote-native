import {createContext} from "react";
import StorageStoreType from "./types/StorageStoreType";

const StorageContext = createContext<StorageStoreType>({});

export default StorageContext;