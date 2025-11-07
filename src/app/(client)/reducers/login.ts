export const loginReducer=(state=false,action:any)=>{
    // console.log("State",state);
    // console.log("Action",action);
    switch(action.type){
        case "CHECK_LOGIN":
            return action.status;
        default:
            return state;
    }
}