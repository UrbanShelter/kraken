import { storage } from "./firebase";

// storage test
export const uploadTest = (ref, file) => {
  return storage.ref(ref).put(file);
};

// delete test
export const deleteTest = ref => {
  return storage.ref(ref).delete();
};
