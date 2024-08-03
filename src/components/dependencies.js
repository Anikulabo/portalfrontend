import axios from 'axios';
import { store } from '..';
export const objectreducer = (prev, usefulkeys) => {
  // Check if argument is a non null object
  if (typeof prev !== "object" || prev === null || !Array.isArray(usefulkeys)) {
    throw new Error(
      "1st arguments must be non-null object while useful keys must be an array"
    );
  }

  // Filter current object to get only keys that are string
  const updatedEntries = Object.fromEntries(
    Object.entries(prev).filter(([key]) => usefulkeys.includes(key))
  );

  return { newobject: updatedEntries, changeditems: usefulkeys };
};
export const onselected = (event, allentries, selected) => {
  if (!Array.isArray(allentries) || typeof selected !== "string") {
    throw new Error(
      "The second argument should be an array of objects, and the third argument should be a string"
    );
  }
  let seaechkey = event.currentTarget.getAttribute("id");
  const detail = allentries[seaechkey];
  if (detail) {
    const res = detail[selected];
    if (res) {
      //console.log(res);
      return { res: res, id: detail.id };
    } else {
      const detailkeys = Object.keys(detail);
      throw new Error(
        `The selected key should be one of ${detailkeys.join(
          ", "
        )}, but you provided '${selected}'`
      );
    }
  } else {
    throw new Error(`there is no object with id: ${seaechkey}`);
  }
};
export const arraycompare = (first, second) => {
  if (!Array.isArray(first) || !Array.isArray(second)) {
    throw new Error("both arguments must be an array");
  }
  let minimum = Math.min(first.length, second.length);
  let match = 0;
  for (const item of first) {
    if (second.includes(item)) {
      match += 1;
    }
  }
  return match >= minimum;
};
export const typechecker = (incomingobject, expectedkeys) => {
  // An array to accept the good keys
  const goodkeys = [];

  // Check if expectedkeys is an array
  if (!Array.isArray(expectedkeys)) {
    throw new Error(
      "The second parameter should be an array of objects with key-value pairs of 'key' and 'type'."
    );
  }

  // Check for any abnormalities in the expectedkeys array
  const abnormality = expectedkeys.find(
    (detail) =>
      !detail.key ||
      !detail.type ||
      (typeof detail.type !== "string" && !Array.isArray(detail.type))
  );
  if (abnormality) {
    throw new Error(
      `Abnormal key: ${JSON.stringify(
        abnormality
      )}. We need an array of objects with keys ['key', 'type'] as the second parameter, and both key and type must be strings.`
    );
  }

  // Check if incomingobject is a valid object
  if (
    typeof incomingobject !== "object" ||
    incomingobject === null ||
    Array.isArray(incomingobject)
  ) {
    throw new Error(
      `The first parameter should be a non null object, but you provided a ${typeof incomingobject} or a null object.`
    );
  }

  // Iterate over the keys and values of the incoming object
  for (const [key, value] of Object.entries(incomingobject)) {
    const match = expectedkeys.find((element) => element.key === key);

    // Check if the key exists in the expected keys
    if (!match) {
      throw new Error(`Your incoming object has an unexpected key: ${key}.`);
    }

    // Validate the type of the value
    if (match.type !== "array" && match.type !== typeof value) {
      throw new Error(
        `Expected a ${
          match.type
        } for key ${key} in the first parameter, but received a ${typeof value}.`
      );
    }

    // Special handling for array type
    if (match.type === "array" && !Array.isArray(value)) {
      throw new Error(
        `Expected an array for key ${key} in the incoming object, but received a ${typeof value}.`
      );
    }

    // Handle cases where 'type' is an array of acceptable types
    if (Array.isArray(match.type) && !match.type.includes(typeof value)) {
      throw new Error(
        `Expected one of [${match.type.join(
          ", "
        )}] for key ${key}, but received ${typeof value}.`
      );
    }

    // If all checks pass, add the key to the good keys array
    goodkeys.push(key);
  }

  // Check for any missing keys
  const missingkeys = expectedkeys
    .map((detail) => detail.key)
    .filter((key) => !goodkeys.includes(key));
  if (missingkeys.length > 0) {
    throw new Error(`You are missing keys [${missingkeys.join(", ")}].`);
  }

  return goodkeys;
};
export const uniquekeycheck = (obj) => {
  let usedkeys = [];

  const checkKeys = (object) => {
    for (const [key, value] of Object.entries(object)) {
      if (usedkeys.includes(key)) {
        throw new Error(
          `The key '${key}' has already been used. All keys should be unique.`
        );
      } else {
        usedkeys.push(key);
      }

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        checkKeys(value);
      }
    }
  };

  checkKeys(obj);
  return true; // Indicate successful uniqueness check
};

export const automatic_obj_update = (obj, value, key) => {
  try {
    uniquekeycheck(obj); // This will throw an error if there are duplicate keys

    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        return { ...obj, [key]: [...obj[key], value] };
      } else {
        return { ...obj, [key]: value };
      }
    } else {
      for (const [childkey, childvalue] of Object.entries(obj)) {
        if (
          typeof childvalue === "object" &&
          !Array.isArray(childvalue) &&
          childvalue !== null
        ) {
          if (childvalue.hasOwnProperty(key)) {
            return {
              ...obj,
              [childkey]: { ...childvalue, [key]: value },
            };
          }
        }
      }
    }

    // If key is not found, add it at the top level
    return { ...obj, [key]: value };
  } catch (error) {
    console.error("Error:", error);
  }
};
// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // replace with your API's base URL
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from local storage or state
    const token = store.getState().token;

    if (token) {
      // Add the token to the headers
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;

/*let updated = false;
      const newObject = { ...object };

      for (const k in object) {
        if (typeof object[k] === 'object' && object[k] !== null && !Array.isArray(object[k])) {
          const result = updateKey(object[k], key, value);
          if (result !== object[k]) {
            newObject[k] = result;
            updated = true;
          }
        }
      }

      if (updated) {
        return newObject;
      }

      throw new Error(
        `The key should be a member of ${Object.keys(object).join(
          ", "
        )}. You provided ${key}.`
      );*/
