import fakeFetch from "./mock/mockup";

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

const deepObjCopy = (obj) => {
  if (typeof obj !== "object" || !obj) return obj;

  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    clone[key] = deepObjCopy(obj[key]);
  }
  return clone;
};

export { data, groupDataByCategory, deepObjCopy };
