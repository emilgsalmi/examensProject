import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { 
  collection, 
  getFirestore, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
} from 'firebase/firestore/lite';


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
  isSold: boolean,
  type:"GUITAR" | "PEDAL",
  specifications:{
    body:string,
    fretboard:string,
    neck:string,
    pickups:string
  }
}

//* GET GUITARS LIST
export async function getGuitars(): Promise<Product[]> {
  const productRef = collection(db, 'guitars');
  const productSnapshot = await getDocs(productRef);

  const productList: Promise<Product>[] = productSnapshot.docs.map(async (doc) => {
    const productData = doc.data() as Product;
    productData.id = doc.id
    productData.type = "GUITAR"

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

  return resolvedProductList;
}

//* GET PEDALS LIST
export async function getPedals(): Promise<Product[]> {
  const productRef = collection(db, 'pedals');
  const productSnapshot = await getDocs(productRef);

  const productList: Promise<Product>[] = productSnapshot.docs.map(async (doc) => {
    const productData = doc.data() as Product;
    productData.id = doc.id
    productData.type = "PEDAL"

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
    } 

    return productData;
  });

  const resolvedProductList = await Promise.all(productList);

  return resolvedProductList;
}


export async function addPaymentDetails(paymentDetails:any): Promise<void>{
  try{
    const orderCollection = collection(db,'orders')
    await addDoc(orderCollection, paymentDetails)
  } catch(error){
    console.log('Misslyckades med att lägga till betalningsinformation')
    throw error
  }
}

export async function markGuitarAsSold(productId: string): Promise<void> {
  const productRef = doc(db, 'guitars', productId);

  try {
    await updateDoc(productRef, { isSold: true });
    console.log('Gitarr är markerad som såld!',`${productId}`);
  } catch (error) {
    console.error('Misslyckades med att markera gitarr som såld:', error, `${productId}`);
    throw error;
  }
}

export async function markPedalAsSold(productId:string): Promise<void> {
  const productRef = doc(db, 'pedals', productId);

  try {
    await updateDoc(productRef, { isSold: true });
    console.log('Pedal är markerad som såld!',`${productId}`);
  } catch (error) {
    console.error('Misslyckades med att markera pedal som såld:', error, `${productId}`);
    throw error;
  }
}



