import { useState } from "react";
import useFetch from "./useFetch";

const Home = () => {
    const [rndId, setRndId] = useState(Math.floor(Math.random() * 101));
    const { quotes, isPending, error } = useFetch('https://raw.githubusercontent.com/amfazary/Random-Quote-Machine/main/src/Quotes.json');
    let quote = null;
    let tweet = null;
    let colors = [{background: "#0E1A45", text: "#FF9176"},
    {background: "#66163D", text: "#FFBD8E"},
    {background: "#143E47", text: "#EBB6FF"},
    {background: "#093D0D", text: "#CFC1FF"},
    {background: "#020200", text: "#77ACFF"},
    {background: "#FFC65B", text: "#101C2F"}]
    let color = Math.floor(Math.random() * colors.length);
    let background = colors[color].background;
    let text = colors[color].text;
    let boxShadowColor =  "0 0 50px 20px " + background;

    if (quotes) {
        quote = quotes.find(obj => obj.id === rndId);
        tweet = "https://twitter.com/intent/tweet?hashtags=quotes&related=amfazary&text=%22" +
        quotes.find(obj => obj.id === rndId).quote.replace(/ /g,"%20") +
        quotes.find(obj => obj.id === rndId).author.replace(/ /g,"%20");
        color = Math.floor(Math.random() * colors.length);
        background = colors[color].background;
        text = colors[color].text;
        boxShadowColor =  "0 0 50px 20px " + background;
    };


    const handleClick = () =>{
        setRndId(Math.floor(Math.random() * 101));
        quote = quotes.find(obj => obj.id === rndId);
    }
    
    return (
        <div>
            { error && <div>{ error }</div> }
            { isPending && 
            <div className="quote-box" style={{backgroundColor: background, boxShadow: boxShadowColor}}>
                <div 
                    style={{color: text, 
                        textAlign: "center"}}
                >Looding...</div>
            </div> }
            { quote && 
            <div id="quote-box" style={{backgroundColor: background, boxShadow: boxShadowColor}}>   
                <div id="text" style={{color: text}}>
                    <p>“{ quote.quote }”</p>
                </div>
                <div id="author" style={{color: text}}>
                    <p>{ quote.author }</p>
                </div>
                <button 
                    onClick={()=>{handleClick()}}
                    id="new-quote"
                    style={{backgroundColor: text, color: background}}>
                        new quote
                </button>
                <div>
                    <a 
                        id="tweet-quote" 
                        target="_blank"
                        rel="noreferrer"
                        href={tweet}
                        style={{color: text}}
                    >
                        <i className="fa fa-twitter"></i>
                    </a>
                </div>
            </div>}
        </div>
    );
}
 
export default Home;