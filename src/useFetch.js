import { useEffect, useState } from "react";

const useFetch = (url) => {
    
    let [quotes,setQuotes] = useState(null);
    let [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if(!res.ok) {
                        throw Error('that resource is not working');
                    }
                    
                    return res.json();
                })
                .then(data => {
                    setQuotes(data.quotes.map(function(el,index) {
                        var o = Object.assign({}, el);
                        o.id = index;
                        return o;}));
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
            }, 1000);
        }, [url]);
        
        return { quotes, isPending, error }
}
 
export default useFetch;
