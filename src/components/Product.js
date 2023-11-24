function Product({ product }) {
  return (
    <>
      {/* <li>
        {product.name} - {product.price} - {product.category}
      </li> */}
      <div className="card" style={{ maxWidth: "600px", maxHeight: "400px" }}>
        <img
          src={
            product.image
              ? `http://localhost:8000/${product.image}`
              : `https://picsum.photos/268/180?random=${Math.random()}`
          }
          // src={"https://picsum.photos/268/180?random=" + product.id}
          alt="Product"
          style={{ maxWidth: "300px", maxHeight: "200px"}}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </>
  );
}

export default Product;