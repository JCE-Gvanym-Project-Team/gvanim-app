/*
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
*/
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

export async function uploadFileToFirestore(file: File, path: string, name: string): Promise<void> {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`${path}/${name}`);
  const snapshot = await fileRef.put(file);
  const downloadUrl = await snapshot.ref.getDownloadURL();
  const firestore = await firebase.firestore();
  const docRef = firestore.collection(path).doc(name);
  await docRef.set({
    downloadUrl: downloadUrl
  });
  console.log(`File ${name} uploaded to Firestore at path ${path}`);
}
export async function getDownloadUrlFromFirestorePath(path: string): Promise<string> {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(path);

  try {
    const fileSnapshot = await fileRef.getMetadata();

    if (!fileSnapshot || fileSnapshot.contentType?.startsWith('folder')) {
      return '';
    }

    const downloadUrl = await fileRef.getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.error(error);
    return '';
  }
}
export async function getFileExtensionsInFolder(folderPath: string): Promise<string[]> {
  const storageRef = firebase.storage().ref(folderPath);
  const files = await storageRef.listAll();
  const extensions: string[] = [];

  for (const file of files.items) {
    const fileSnapshot = await file.getMetadata();

    if (fileSnapshot.contentType?.startsWith('image/') || fileSnapshot.contentType?.startsWith('video/')) {
      const extension = file.name.split('.').pop();
      if (extension) {
        extensions.push(extension);
      }
    }
  }

  return extensions;
}
export async function deleteFile(path: string) {
  const storageRef = firebase.storage().ref(path);
  await storageRef.delete();
}
export async function fileExists(path: string) {
  const storageRef = firebase.storage().ref(path);
  try{
  const metaData = await storageRef.getMetadata();
  return metaData !== null;
  }
  catch(error: any){
    return false;
  }
}