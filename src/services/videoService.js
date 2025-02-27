import httpRequest from "@/utils/httpRequest.js";

export const uploadVideo = async (data) => {
    try{
        const res = await httpRequest({
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "post",
            url: `/api/upload-video`,
            data
        })
        return res
    }catch (err){
        throw err
    }
}