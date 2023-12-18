import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CartHistory({ userId }) {
  // const HOST_URL = "http://localhost:8000";
  const HOST_URL = "https://django-final-proj-products.onrender.com";

  const [closedCarts, setClosedCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClosedCarts = async () => {
      try {
        const response = await axios.get(`${HOST_URL}/cart/`, {
          params: { user_id: userId },
        });

        console.log("User Carts:", response.data);

        // Filter closed carts
        const closedCartsFiltered = response.data.filter(
          (cart) => cart.status === "Closed"
        );

        console.log("Closed Carts:", closedCartsFiltered);

        setClosedCarts(closedCartsFiltered);
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
    <div className="cart-container">
      <h1 className="text-center mb-3" style={{ color: "white", fontStyle: "italic" }}>
        Carts History :
      </h1>
      {closedCarts.length === 0 ? (
        <p>No closed carts found for the user.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Open Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {closedCarts.map((cart) => (
              <tr key={cart.id}>
                <td>
                  {cart.date &&
                    new Date(cart.date).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/cart_items_history/${cart.id}`}
                  >
                    Cart Items History
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CartHistory;
