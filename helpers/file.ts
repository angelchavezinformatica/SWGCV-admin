export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr: string[] = dataurl.split(",");
  const mime: string = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);

  const fullfilename = `${filename}.${mime.split("/")[1]}`;

  return new File([u8arr], fullfilename, { type: mime });
};
