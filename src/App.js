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

function Content({ filteredData }) {
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

function Search({ filterText, setFilterText, setFilteredData, groupedData }) {
 const onSearch = (e) => {
   const newText = e.target.value;
   setFilterText(newText, () => {
     console.log(newText);
     // Выполните другие действия, используя обновленное значение filterText
     // if (newText) {
     //   setFilteredData(filterDataByInput(newText, groupedData));
     // } else {
     //   setFilteredData(groupedData);
     // }
   });
 };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={onSearch}
      />
      <label>
        <input type="checkbox" />
        Only show products in stock
      </label>
    </div>
  );
}

function FilterableProductTable({ data }) {
  const groupedData = groupDataByCategory(data);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(groupedData);

  return (
    <div className="App">
      <Search
        filterText={filterText}
        setFilterText={setFilterText}
        setFilteredData={setFilteredData}
        groupedData={groupedData}
      />
      <div className="label">Name</div>
      <div className="label">Price</div>
      <Content filteredData={filteredData} />
    </div>
  );
}

function App() {
  return <FilterableProductTable data={data} />;
}

export default App;
