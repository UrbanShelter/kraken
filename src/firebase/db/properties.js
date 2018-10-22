import { db, location } from "../firebase";

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () => db.ref("users").once("value");

export const doTest = () => {
  var ref = db.collection("properties").doc();

  var data = {
    category: "apartment",
    location: {
      address: "1 Victoria St S",
      apartment: "1502",
      geopoint: location(1, 1)
    }
  };

  // Another way to validate the input is by dynamically omitting it
  // from the object. However, the location function returns null
  // so the location key would have this value if the types are not
  // correct. We can then check for this in other operations client-side
  // Since the location field is standardized.
  // var locationData = location(1, "hello");
  // if (locationData) data.location = locationData;

  ref.set(data);

  ref
    .collection("descriptors")
    .doc("amenities")
    .set({
      balcony: false,
      heating: true,
      washer: true
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

export const uploadData = (data, docId) => {
  let ref = docId
    ? db.collection("draft-properties").doc(docId)
    : db.collection("draft-properties").doc();

  ref
    .set(data)
    .then(function() {
      console.log("Draft saved");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error.message);
    });
};

// returns parsed query data from the test query location
export const doTestRead = () => {
  var ref = db.collection("properties");

  var map = [];

  return ref
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        map.push(doc.data());
      });

      return new Promise((resolve, reject) => {
        resolve(map);
      });
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
};

export const doRealtimeTestRead = callback => {
  var ref = db.collection("properties");

  return ref.onSnapshot(function(querySnapshot) {
    var map = [];
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      map.push(doc.data());
    });

    callback(map);
  });
};
