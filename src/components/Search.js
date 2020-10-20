import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('coding');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedTerm(term);
            console.log('When Im Updated? First?');
        },1000);

        return ()=>{
            clearTimeout(timerId);
            console.log('When Im Updated? Second?');
        };
    },[term]);

    useEffect(()=>{const search = async ()=>{
        const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
            params:{
                action: 'query',
                list: 'search',
                origin:'*',
                format:'json',
                srsearch: debouncedTerm,
            },
        });
        setResults(data.query.search);
    };
    console.log('Am I Running?');
    if (debouncedTerm) {
        search();
      }
    }, [debouncedTerm]);

    console.log(results);

    const renderedResults = results.map((result)=>{
    return (
        <div key={result.pageid} className="item">
            <div className="right floated content">
                <a href={`https://en.wikipedia.org?curid=${
                    result.pageid
                }`} className="ui button">Go</a>
            </div>
            <div className="content">
                <div className="header">
                    {result.title}
                </div>
                <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                {/* {result.snippet} */}
            </div>
        </div>
    )
})

    return (
        <div>
         <div className="ui form">
             <div className="field">
                 <label htmlFor="">Enter Search Name</label>
                 <input value={term} onChange={e=>setTerm(e.target.value)} type="text" className="input"/>
             </div>
         </div>
         <div className="ui celled list">
             {renderedResults}
         </div>
        </div>
    )
}
export default Search