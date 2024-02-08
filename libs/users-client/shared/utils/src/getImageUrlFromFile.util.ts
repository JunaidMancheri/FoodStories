export function getImageUrlFromFile(f: File) : Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
     resolve(String(fr.result))
    }

    fr.onerror = (error) => reject(error)
    fr.readAsDataURL(f);
  })

}