import { API_DOMAIN } from "../../../config/config";

const validateApiDomain = () => {
    if (!API_DOMAIN) {
        throw new Error("API_DOMAIN is not configured. Please set NEXT_PUBLIC_API_DOMAIN in .env.local file.");
    }
};

export const get=async(path:string)=>{
    validateApiDomain();
    const response=await fetch(API_DOMAIN+path);
    const result=await response.json();
    return result;
}
export const post=async(path:string,options:unknown)=>{
    validateApiDomain();
    const isFormData=options instanceof FormData;
    const headers:HeadersInit={
        Accept:"application/json",
    };
    if(!isFormData){
        headers["Content-Type"]="application/json";
    }
    const response=await fetch(API_DOMAIN+path,{
        method:"POST",
        headers,
        body:isFormData?options:JSON.stringify(options),
    });
    const result=await response.json();
    return result;
}
// request.tsx

export const patch = async (path: string, options: unknown) => {
    validateApiDomain();
    const isFormData = options instanceof FormData;
    const headers: HeadersInit = {
      Accept: "application/json",
    };
  
    // Nếu là FormData: dùng POST + _method=PATCH (method spoofing)
    if (isFormData) {
      const formData = options as FormData;
      formData.append("_method", "PATCH");
  
      const response = await fetch(API_DOMAIN + path, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      return result;
    }

    headers["Content-Type"] = "application/json";
  
    const response = await fetch(API_DOMAIN + path, {
      method: "PATCH",
      headers,
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return result;
  };
  
export const del=async(path:string)=>{
    validateApiDomain();
    const response=await fetch(API_DOMAIN+path,{
        method:"DELETE",
    });
    
    // Handle 204 No Content response
    if (response.status === 204) {
        return {
            success: true,
            data: null,
            error: null,
        };
    }
    
    // Check if response has content before parsing JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        return result;
    }
    
    // If no JSON content, return success for 2xx status codes
    if (response.ok) {
        return {
            success: true,
            data: null,
            error: null,
        };
    }
    
    // For error responses, try to parse JSON or return error
    try {
        const result = await response.json();
        return result;
    } catch {
        return {
            success: false,
            data: null,
            error: {
                message: `HTTP ${response.status}: ${response.statusText}`,
                code: null,
            },
        };
    }
}