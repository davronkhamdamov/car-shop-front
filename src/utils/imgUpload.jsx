async function fileUpload(formData) {
  const img = await fetch(
    "https://api.cloudinary.com/v1_1/didddubfm/image/upload",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.url;
    });
  return img;
}
export { fileUpload };
