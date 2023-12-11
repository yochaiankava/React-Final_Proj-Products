import axios from "axios";
import { useEffect, useState } from "react";
// import HOST_URL from "../App"

function GiftCards() {
  const [giftCards, setGiftCards] = useState([]);

  function getGiftCards() {

    const HOST_URL ="http://localhost:8000"
    // const HOST_URL = "https://django-final-proj-products.onrender.com";

    console.log("!!! getGiftCards !!!");
    axios.get(HOST_URL + "/gift_cards/")
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
        <li key={card.id}>{card.description} - {card.sum}</li>
      ))}
    </>
  );
}

export default GiftCards;
