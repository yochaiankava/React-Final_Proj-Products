import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function CartHistory({ userId }) {
  const HOST_URL = "http://localhost:8000";
  // const HOST_URL = "https://django-final-proj-products.onrender.com";

  const [closedCarts, setClosedCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClosedCarts = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/cart/`, {
          params: { user_id: userId, status: "Closed" },
        });

        console.log("Closed Carts:", response.data);

        setClosedCarts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching closed carts:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchClosedCarts();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return <p>Loading closed carts...</p>;
  }

  return (
    <div>
      <div>
      <h2>Carts History :</h2>
      {/* <h2>Cart History - Closed Carts for User ID: {userId}</h2> */}
      {closedCarts.length === 0 ? (
        <p>No closed carts found for the user.</p>
      ) : (
        <ul>
          {closedCarts.map((cart) => (
            <li key={cart.id}>
              {/* <p>Cart ID: {cart.id}</p> */}
              {/* <p>Open Date: {cart.date}</p> */}
              <p>
                Open Date:{" "}
                {cart.date && new Date(cart.date).toLocaleDateString("en-GB")}
              </p>
              {/* <p>Status: {cart.status}</p> */}
              {/* Additional information about the closed cart */}
              {/* <p>Total Cart Price: {}</p> */}
              <p>
              <Link className="btn btn-success" 
              to={`/cart_items_history/${cart.id}`}  >
                Cart Items History
              </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default CartHistory;
