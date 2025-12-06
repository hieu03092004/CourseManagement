export const checkLogin=(status:boolean)=>{
    return {
        type:"CHECK_LOGIN",
        status:status
    }
}

export const getRole=(roleId:number)=>{
    let roleName = "";
    if(roleId === 2){
        roleName = "Instructor";
    } else if(roleId === 1){
        roleName = "Admin";
    }
    else{
        roleName = "User";
    }
    return {
        type:"GET_ROLE",
        roleName:roleName
    }
}