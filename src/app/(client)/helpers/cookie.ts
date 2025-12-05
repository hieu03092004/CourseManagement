export function setCookie(cname:string,cvalue:string,exdays:number){
    const d=new Date();
    d.setTime(d.getTime()+exdays*24*60*60*1000);
    const expires="expires=" +d.toUTCString();
    // Set cookie với path=/ để có thể truy cập từ mọi path
    document.cookie=cname+"="+cvalue+";"+expires+";path=/";
}
export function getCookie(cname:string) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function deleteCookie(cname:string) {
    // Xóa cookie với path=/ để đảm bảo xóa được cookie ở mọi path
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    // Xóa cookie với domain hiện tại (nếu có)
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    // Xóa cookie không có domain (localhost)
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost`;
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // Xóa cookie với path hiện tại
        document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        // Xóa cookie với path root (để đảm bảo xóa hết)
        document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
    }
}
