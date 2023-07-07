const RestaurantMenuItems = ({ items }) => {
  console.log(items);
  return (
    <>
      {items?.map((nestitem) => (
        <div className="border-2" key={items.id}>
          <h1>{nestitem.card.info.name}</h1>
          <p>{nestitem.card.info.description}</p>
          <h2> {nestitem.card.info.defaultPrice}</h2>
        </div>
      ))}
    </>
  );
};

export default RestaurantMenuItems;
