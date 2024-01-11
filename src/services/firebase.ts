import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { collection, getFirestore, getDocs } from 'firebase/firestore/lite';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABti2RC9qHKlX1nuSrnNK5nTEbExlM-aw",
  authDomain: "emils-gitarr-butik.firebaseapp.com",
  projectId: "emils-gitarr-butik",
  storageBucket: "emils-gitarr-butik.appspot.com",
  messagingSenderId: "372371680106",
  appId: "1:372371680106:web:a4880cf085dad6d3825313",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app)

const storage = getStorage(app)

interface Product{
  id:string,
  name:string,
  price:number,
  imagePaths:string,
  imageUrl?:string,
  quantity:number,
  specifications:{
    body:string,
    fretboard:string,
    neck:string,
    pickups:string
  }
}

export async function getProducts(): Promise<Product[]> {
  const productRef = collection(db, 'products');
  const productSnapshot = await getDocs(productRef);

  const productList: Promise<Product>[] = productSnapshot.docs.map(async (doc) => {
    const productData = doc.data() as Product;

    if (productData.imagePaths && typeof productData.imagePaths === 'string') {
      const imagePaths = productData.imagePaths;

      try {
        productData.imageUrl = await getDownloadURL(ref(storage, imagePaths));
      } catch (error) {
        console.error(`Error fetching image URL for product ${productData.id}:`, error);
      }
    } else {
      console.error(`Invalid imagePaths for product ${productData.id}`);
    }

    return productData;
  });

  const resolvedProductList = await Promise.all(productList);
  console.log(resolvedProductList);

  return resolvedProductList;
}








//* denna kod fungerar måste bara göras bättre
/* export async function getProducts(){
   const productRef = collection(db,'products')
   const productSpapshot = await getDocs(productRef)
   const productList = productSpapshot.docs.map(doc => doc.data())

   console.log(productList)
   
   return productList
}

getDownloadURL(ref(storage, 'images/gibson_lesPaul/gibson_les-paul.jpg'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg') as HTMLImageElement
    img.setAttribute('src', url)


  })
  .catch((error) => {
    // Handle any errors
  }); */


