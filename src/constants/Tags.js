export const TAGS = ["BOOK", "VIDEO GAME"];

export const addNewTag = (newTag) => {
  TAGS.push(newTag.toUpperCase());
};

export const removeTag = (tag) => {
  const index = TAGS.findIndex((element)=>tag.toUpperCase() === element);
  TAGS.splice(index, 1); // modify original array
};
