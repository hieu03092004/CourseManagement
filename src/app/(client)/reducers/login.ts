interface CheckLoginAction {
    type: "CHECK_LOGIN";
    status: boolean;
}

type LoginAction = CheckLoginAction;

export const loginReducer = (state: boolean = false, action: LoginAction): boolean => {
    // console.log("State",state);
    // console.log("Action",action);
    switch(action.type){
        case "CHECK_LOGIN":
            return action.status;
        default:
            return state;
    }
}