import API from '../config/apiConfig';

export const fetchRecords = async () => {
    try {
        const res = await fetch(API.RECORD, {
            
            headers: {
                "x-api-key": "00001111"
            }
        })
        if (!res.ok) {
            throw new Error("Failed");
        }        
        return res.json();
        //   setSpects(data);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
        // setError(errorMessage);
    } finally {
        // setLoading(false); // 請求結束後將加載狀態設為 false
    }
};