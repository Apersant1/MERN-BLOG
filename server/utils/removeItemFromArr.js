const removeObjectFromArray = (array, objectId) => {
  array = array.filter((obj)=>{
    return obj._id !== objectId
  })
  return array;
};

export default removeObjectFromArray