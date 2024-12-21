export async function convertToBase64(image: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(image);
    // after the reader is done reading the image
    reader.onloadend = () => {
      resolve(reader.result);
    }
    // on error event listener
    reader.onerror = () => reject(null)
  })
}

