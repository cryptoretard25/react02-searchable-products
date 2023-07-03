async function fakeFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        {
          category: "Fruits",
          price: "$2",
          stocked: false,
          name: "Passionfruit",
        },

        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        {
          category: "Vegetables",
          price: "$4",
          stocked: false,
          name: "Pumpkin",
        },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },

        { category: "Fish", price: "$10", stocked: false, name: "Roach" },
        { category: "Fish", price: "$55", stocked: false, name: "Sea bass" },
        { category: "Fish", price: "$19", stocked: true, name: "Whitefish" },

        { category: "Meat", price: "$30", stocked: false, name: "Chicken" },
        { category: "Meat", price: "$90", stocked: false, name: "Beef" },
      ];
      resolve(data);
    }, 2000);
  });
}

export default fakeFetch;
