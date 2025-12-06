interface GetRoleAction {
    type: "GET_ROLE";
    roleName: string;
}

type RoleAction = GetRoleAction;

export const roleReducer = (state: string = "", action: RoleAction): string => {
    switch(action.type){
        case "GET_ROLE":
            return action.roleName;
        default:
            return state;
    }
}

