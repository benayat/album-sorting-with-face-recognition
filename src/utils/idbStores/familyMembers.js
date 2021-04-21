import { openDB, deleteDB } from "idb";

const dbPromise = openDB("familyMembersDB", 1, {
  upgrade(db) {
    db.createObjectStore("familyMembers", {
      keyPath: "label",
    });
    db.createObjectStore("signUp", {
      keyPath: "userName",
    });
  },
});
export const signUpInterface = {
  async get(userName) {
    return (await dbPromise).get("signUp", userName);
  },
  async set(userObject) {
    return (await dbPromise).put("signUp", userObject);
  },
  async getDescriptor(userName) {
    const user = (await dbPromise).get("signUp", userName);
    return user.descriptor;
  },
};

//object in this store looks like:
/* 
userName: {
  name: ___
  Src: ___
  descriptor:[]
}
*/

const familyMembersInterface = {
  async get(key) {
    return (await dbPromise).get("familyMembers", key);
  },
  async getAll() {
    return (await dbPromise).getAll("familyMembers");
  },
  //here too, because I iterate over an array with descriptors, I must be more performant and not use index,
  //since its just creating a new 'silent' store and wasting alot of space and time - so I'm using opencursor
  //as iterator.
  //after this change, we don't need anymore the third database of familyNames!! hooray :)
  async getAllNames() {
    let store = (await dbPromise).transaction("familyMembers").store;
    let cursor = await store.openCursor();
    let namesOutput = [];
    while (cursor) {
      const { label } = cursor.value;
      namesOutput.push(label);
      cursor = await cursor.continue();
    }
    return namesOutput;
  },
  //object: {label, src,}
  async set(object) {
    return (await dbPromise).put("familyMembers", object);
  },
  async deleteByLabel(labelKey) {
    return (await dbPromise).delete("familyMembers", labelKey);
  },
  async clear() {
    return (await dbPromise).clear("familyMembers");
  },
  async deleteAllDatabase() {
    return await deleteDB("familyMembersDB");
  },
};

export default familyMembersInterface;
