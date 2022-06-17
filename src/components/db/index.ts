import { stringify, parse } from "flatted";
import { IMarker } from "../Map/Marker";

interface AddDataParams {
  name: string;
  places: IMarker[];
}

let db: IDBDatabase;
window.onload = function () {
  const request = window.indexedDB.open("db", 2);
  request.onerror = function (e) {
    console.log("Database failed to open");
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
    db = request.result;
  };
  request.onupgradeneeded = function (e) {
    //@ts-ignore
    const db = e.target.result as IDBDatabase;

    const objectStore = db.createObjectStore("place", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("name", "name", { unique: true });
    objectStore.createIndex("places", "places", { unique: false });

    console.log("Database setup complete");
  };
};

export function addData({ name, places }: AddDataParams) {
  const newItem = { name, places: stringify(places) };

  const transaction = db.transaction(["place"], "readwrite");

  const objectStore = transaction.objectStore("place");

  const request = objectStore.add(newItem);
  request.onsuccess = function () {
    console.log("success");
  };

  transaction.oncomplete = function () {
    console.log("Transaction completed: database modification finished.");
  };

  transaction.onerror = function () {
    console.log("Transaction not opened due to error");
  };
}

export function readData() {
  const transaction = db.transaction(["place"], "readonly");
  const objectStore = transaction.objectStore("place");

  const myIndex = objectStore.index("name");

  const getRequest = myIndex.getAll();

  return new Promise((resolve) => {
    getRequest.onsuccess = function () {
      const places = getRequest.result;
      resolve(
        places.map(({ places, name }) => ({ name, places: parse(places) }))
      );
    };
  });
}

export function removeData(name: string) {
  const transaction = db.transaction(["place"], "readwrite");
  const objectStore = transaction.objectStore("place");

  const myIndex = objectStore.index("name");

  const request = myIndex.get(name);

  request.onsuccess = function () {
    const deleteRequest = objectStore.delete(request.result.id);
    deleteRequest.onsuccess = function () {
      console.log("Item deleted!");
    };
  };
}
