import { useContext } from "react";
import DesignContext from "../context/DesignContext.jsx";

export const useDesign = () => useContext(DesignContext);