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

function Search({ data, onSearch }) {

  const handler = () => {
    const dataCopy = deepObjCopy(data);
    let temp;
    if (state.value) {
      const filteredByInput = filterDataByInput(state.value, dataCopy);
      temp = state.checked
        ? filterDataByStocked(filteredByInput)
        : filteredByInput;
    } else {
      temp = state.checked ? filterDataByStocked(dataCopy) : dataCopy;
    }
    onSearch(temp);
  };

  const handleKeyUp = (e) => {
    state.value = e.target.value;
    handler();
  };

  const handleCheckBox = (e) => {
    state.checked = e.target.checked;
    handler();
  };

  return (
    <div className="search-box">
      <input type="text" placeholder="Search..." onKeyUp={handleKeyUp} />
      <label>
        <input type="checkbox" onChange={handleCheckBox} />
        Only show products in stock
      </label>
    </div>
  );
}

function Content({ processedData }) {
  return (
    <div className="content-box">
      {processedData.map((category, index) => {
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

function FilterableProductTable({ data }) {
  const groupedByCat = groupDataByCategory(data);
  const [products, setProducts] = useState(groupedByCat);

  const onSearch = (array) => {
    setProducts(array);
  };

  return (
    <div className="App">
      <Search data={groupedByCat} onSearch={onSearch} />
      <div className="label">Name</div>
      <div className="label">Price</div>
      <Content processedData={products} />
    </div>
  );
}

function App() {
  return <FilterableProductTable data={data} />;
}

export default App;
