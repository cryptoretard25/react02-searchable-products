import "./App.css";
import { useState } from "react";
import { data, groupDataByCategory, deepObjCopy } from "./backend.js";

function Search() {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </div>
  );
}

function Content() {
  const [products, setProducts] = useState(data);
  const groupedByCat = groupDataByCategory(products);

  return (
    <div className="content-box">
      {groupedByCat.map((category, index) => {
        return (
          <div key={[index]}>
            <Category name={category[0].category} />
            {category.map((product, productIndex) => {
              return <Product key={[index, productIndex]} product={product} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

function Category({ name }) {
  return <div className="content-category">{name}</div>;
}

function Product({ product }) {
  return (
    <div className="content-row">
      {product.stocked ? (
        <div style={{ color: "red" }}>{product.name}</div>
      ) : (
        <div>{product.name}</div>
      )}
      <div>{product.price}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Search />
      <div className="label">Name</div>
      <div className="label">Price</div>
      <Content />
    </div>
  );
}

export default App;
