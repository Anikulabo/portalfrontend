import { UPDATE } from "./type";
export const updateentry=(update,ctrl)=>{
    return{
        type:UPDATE,
        payload:{update,ctrl}
    }
}
