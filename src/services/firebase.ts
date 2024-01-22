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

export interface Product{
  id:string,
  name:string,
  price:number,
  description:string,
  imagePaths:string,
  imageUrl?:string,
  audioPaths:string,
  audioUrls?:string,
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

    if (productData.audioPaths && typeof productData.audioPaths === 'string') {
      const audioPath = productData.audioPaths;
  
      try {
        productData.audioUrls = await getDownloadURL(ref(storage, audioPath));
      } catch (error) {
        console.error(`Error fetching audio URL for product ${productData.id}:`, error);
      }
    } else {
      console.error(`Invalid audioPaths for product ${productData.id}`, productData.audioPaths);
    }

    return productData;
  });

  const resolvedProductList = await Promise.all(productList);
  console.log(resolvedProductList);

  return resolvedProductList;
}
