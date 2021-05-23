import { openDB, deleteDB } from "idb";

const dbPromise = openDB("imagesDB", 1, {
  upgrade(db) {
    db.createObjectStore("images", {
      keyPath: "title",
    });
  },
});

const get = async (title) => {
  return (await dbPromise).get("images", title);
};
const set = async (imageObject) => {
  return (await dbPromise).put("images", imageObject);
};
const imagesInterface = {
  async get(title) {
    return (await dbPromise).get("images", title);
  },
  async getAll() {
    return (await dbPromise).getAll("images");
  },
  //searching is expensive because of the huge descriptors, so here I'll use a cursor(iterator) to
  //iterate over the store to find what I"m looking for.
  async getAllImagesByLabelText(label) {
    let store = (await dbPromise).transaction("images").store;
    let cursor = await store.openCursor();
    let imagesOutput = [];
    while (cursor) {
      const { labels } = cursor.value;
      if (labels.includes(label)) {
        imagesOutput.push(cursor.value);
      }
      cursor = await cursor.continue();
    }
    return imagesOutput;
  },
  async set(imageObject) {
    return (await dbPromise).put("images", imageObject);
  },
  async deleteByLabel(label) {
    let store = (await dbPromise).transaction("images").store;
    let cursor = await store.openCursor();
    while (cursor) {
      const { labels } = cursor.value;
      labels.filter((currentLabel) => currentLabel !== label);
      cursor = await cursor.continue();
    }
  },
  async deleteImageFromCurrentFamilyMember(title, label) {
    const image = await get(title);
    image.labels = image.labels.filter(
      (currentLabel) => currentLabel !== label
    );
    return await set(image);
  },
  async clear() {
    return (await dbPromise).clear("images");
  },
  async deleteAllDatabase() {
    return await deleteDB("imagesDB");
  },
};

export default imagesInterface;

/* 
image looks like:
object {
  title:___
  src:___
  labels:[]
  descriptor:___
}
*/
