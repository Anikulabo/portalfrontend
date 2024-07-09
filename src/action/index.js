import { UPDATE } from "./type";
export const changeerror=(update,type)=>{
    return{
        type:UPDATE,
        payload:{update,type}
    }
}
