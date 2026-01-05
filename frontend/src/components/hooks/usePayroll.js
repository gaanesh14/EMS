import { useContext } from "react";
import { PayrollContext } from "../common/PayrollProvider";


export const usePayroll = () => {
    const context = useContext(PayrollContext);
    if (!context) {
        throw new Error("usePayroll must be used within a PayrollProvider");
    }   
    return context;
}; 