const convertFileToBase64=(file)=> {
  debugger
  return new Promise((resolve, reject) => {
     if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
           const base64String = e.target.result;
           // Remove the prefix 'data:image/jpeg;base64,' or similar
           const withoutPrefix = base64String.substring(
              base64String.indexOf(",") + 1
           );

           resolve(withoutPrefix); // Resolve the promise with the base64 data
        };

        reader.onerror = (error) => {
           reject(error); // Reject the promise in case of an error
        };

        reader.readAsDataURL(file);
     } else {
        reject("No file provided");
     }
  });
}

export default convertFileToBase64;


