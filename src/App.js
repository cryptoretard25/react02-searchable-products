import "./App.css";
import { useState } from "react";
import {
  data,
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

function Content({ groupedData, filterText, isStocked }) {
  const filteredData = (() => {
    if (isStocked) {
      const filteredByStocked = filterDataByStocked(groupedData);
      return filterText
        ? filterDataByInput(filterText, filteredByStocked)
        : filteredByStocked;
    } else {
      return filterText
        ? filterDataByInput(filterText, groupedData)
        : groupedData;
    }
  })();

  return (
    <div className="content-box">
      {filteredData.map((category, index) => {
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

function Search({ filterText, setFilterText, isStocked, setIsStocked }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isStocked}
          onChange={(e) => setIsStocked(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </div>
  );
}

function FilterableProductTable({ data }) {
  const groupedData = groupDataByCategory(data);
  const [filterText, setFilterText] = useState("");
  const [isStocked, setIsStocked] = useState(false);

  return (
    <div className="App">
      <Search
        filterText={filterText}
        setFilterText={setFilterText}
        isStocked={isStocked}
        setIsStocked={setIsStocked}
      />
      <div className="label">Name</div>
      <div className="label">Price</div>
      <Content
        groupedData={groupedData}
        filterText={filterText}
        isStocked={isStocked}
      />
    </div>
  );
}

function App() {
  return <FilterableProductTable data={data} />;
}

export default App;
