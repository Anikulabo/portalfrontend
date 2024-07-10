import { UPDATE } from "./type";
export const updateentry=(update,type)=>{
    return{
        type:UPDATE,
        payload:{update,type}
    }
}
