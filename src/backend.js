import fakeFetch from "./mock/mockup";

const data = await (async () => {
  return await fakeFetch();
})();

// const data = [
//   { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
//   { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
//   { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
//   { category: "Fruits", price: "$5", stocked: false, name: "Orange" },

//   { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
//   { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
//   { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
//   { category: "Vegetables", price: "$3", stocked: false, name: "Potato" },

//   { category: "Fish", price: "$10", stocked: false, name: "Roach" },
//   { category: "Fish", price: "$55", stocked: false, name: "Sea bass" },
//   { category: "Fish", price: "$19", stocked: true, name: "Whitefish" },
//   { category: "Fish", price: "$25", stocked: true, name: "Perch" },

//   { category: "Meat", price: "$90", stocked: true, name: "Beef" },
//   { category: "Meat", price: "$30", stocked: false, name: "Chicken" },
//   { category: "Meat", price: "$55", stocked: false, name: "Pork" },
//   { category: "Meat", price: "$70", stocked: true, name: "Veal" },
// ];

function groupDataByCategory(data){
  return data.reduce((result, item)=>{
    const category = result.find(subArr=>subArr[0].category === item.category)
    if(category){
      category.push(item)
    }else{
      result.push([item])
    }
    return result
  },[])
}

function filterDataByInput(input, data){
  const result = [];
  
  for(let category of data){
    const filtered = category.filter((product)=>{
      const productName = product.name.toLowerCase();
      const inputData = input.toLowerCase();
      return productName.includes(inputData);
    })
    if(filtered.length){
      result.push(filtered)
    }
  }

  return result
}

function filterDataByStocked(data){
  const result = [];

  for(let category of data){
    const filtered = category.filter((product)=>{
      return product.stocked;
    })
    if(filtered.length) result.push(filtered)
  }

  return result;
}

const deepObjCopy = (obj) => {
  if (typeof obj !== "object" || !obj) return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepObjCopy(obj[key]);
  }
  return clone;
};

export {
  data,
  deepObjCopy,
  groupDataByCategory,
  filterDataByInput,
  filterDataByStocked,
};

