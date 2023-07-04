import fakeFetch from "./mock/mockup";

const state = {
  value: null,
  checked: false
}

const data = await (async () => {
  return await fakeFetch();
})();

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
  state,
  deepObjCopy,
  groupDataByCategory,
  filterDataByInput,
  filterDataByStocked,
};

