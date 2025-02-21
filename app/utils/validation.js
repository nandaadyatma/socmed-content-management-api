function isEmptyOrNull(value) {
  // is it null or undefined
  if (value === null || value === undefined) {
    return true;
  }
  // is it empty string
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  //is it empty array
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  //is it empty object
  if (
    typeof value === "object" &&
    Object.keys(value).length === 0 &&
    value.constructor === Object //<- to make sure this is a literal object, not like other object (array, null, atau instance kelas lain) 
    // constructor === Object means object created by Object constructor, not Array constructor or smthng else 
  ) {
    return true;
  }
}

module.exports = {
    isEmptyOrNull
}
