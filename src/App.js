import "./App.css";
import { useState } from "react";
import {
  data,
  state,
  deepObjCopy,
  groupDataByCategory,
  filterDataByInput,
  filterDataByStocked,
} from "./backend.js";

function Product({ product }) {
  const productName = () =>
    product.stocked ? (
      <div style={{ color: "red" }}>{product.name}</div>
    ) : (
      <div>{product.name}</div>
    );

  return (
    <div className="content-row">
      {productName()}
      <div>{product.price}</div>
    </div>
  );
}

function Category({ name }) {
  return <div className="content-category">{name}</div>;
}

function Content({ content }) {
  return (
    <div className="content-box">
      {content.map((category, index) => {
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

function Search() {

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={state.value}
      />
      <label>
        <input type="checkbox"/>
        Only show products in stock
      </label>
    </div>
  );
}

function FilterableProductTable({ data }) {
  const groupedData = groupDataByCategory(data);

  return (
    <div className="App">
      <Search />
      <div className="label">Name</div>
      <div className="label">Price</div>
      <Content content={groupedData} />
    </div>
  );
}

function App() {
  return <FilterableProductTable data={data} />;
}

export default App;
