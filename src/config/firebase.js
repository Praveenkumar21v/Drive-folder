// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/storage";
// const firebaseConfig = {
//   apiKey: "AIzaSyAQsDc0bhAMKzd_qFC9xvt5DxZT0PjqxoY",
//   authDomain: "file-management-system-16450.firebaseapp.com",
//   projectId: "file-management-system-16450",
//   storageBucket: "file-management-system-16450.appspot.com",
//   messagingSenderId: "422299294279",
//   appId: "1:422299294279:web:7ab7de54a27d741407af62",
// };

// const fire = firebase.initializeApp(firebaseConfig);

// export default fire;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDTPpPQ9MFB8kiBqKhncMqEFM22KAFGZ6A",
  authDomain: "web-drive-a2ef8.firebaseapp.com",
  databaseURL: "https://web-drive-a2ef8-default-rtdb.firebaseio.com",
  projectId: "web-drive-a2ef8",
  storageBucket: "web-drive-a2ef8.appspot.com",
  messagingSenderId: "591967862097",
  appId: "1:591967862097:web:a9750d222be089092b2770",
};

const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
export default fire;
export { db };
