import { useEffect, useState } from "react"
import axios from 'axios';

const usePost = (url, payload) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.post(url, payload).then((res) => {
            setLoading(false);

            setData(res.data);
        }).catch(error => {
            setError(error.message);
        })
    });

    return { loading, error, data };
}