import axios from "axios";
import { useEffect, useState } from "react";


function GiftCards() {
 const [giftCards, setGiftCards] = useState([]);
 function getGiftCards() {
   console.log("!!!  getGiftCards !!!");
   axios
     .get("http://127.0.0.1:8000/gift_cards/")
     .then((response) => {
       console.log(response.data);
       setGiftCards(response.data);
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
 }
 useEffect(getGiftCards, []); // get gift cards when loading this page


 return (
   <>
     {giftCards.map((card) => (
       <li>{card.description} - {card.sum}</li>
     ))}
   </>
 );
}


export default GiftCards;