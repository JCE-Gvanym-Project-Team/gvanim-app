import { useEffect, useState } from "react"
import axios, {AxiosRequestConfig} from "axios";

export const useAxios = <T>(config: AxiosRequestConfig<any>, LoadOnStart: boolean = true):
[boolean, T | undefined, string, () => void] => {
    const [Loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [error,setError] = useState('');

    useEffect(() => {
       if(LoadOnStart) sendRequest();
    }, []);


    const request = () => {
        sendRequest();
    }

    const sendRequest = () => {
        setLoading(true);

        axios(config)

        .then(Response => {
            setError('');
            setData(Response.data);
        })
        
        .catch(error =>{
            setError(error.message);
        })
        .finally(() => setLoading(false));

    }

    return [Loading, data, error, request];
};