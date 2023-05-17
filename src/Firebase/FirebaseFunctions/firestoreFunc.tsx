import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

/**
 * Uploads a file to Firebase Storage and adds a reference to the file in Firestore.
 * @param {File} file - The file to upload.
 * @param {string} path - The path in Firebase Storage to upload the file to.
 * @param {string} name - The name of the file to upload.
 * @returns A Promise that resolves when the file has been uploaded and the reference has been added to Firestore.
 */
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
/**
 * Retrieves the file extensions of all files in a given folder path in Firebase Storage.
 * @param {string} folderPath - The path of the folder in Firebase Storage to retrieve the file extensions from.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file extensions.
 */
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