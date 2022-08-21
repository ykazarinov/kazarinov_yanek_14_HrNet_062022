
export default function checkFileType(file, myResult){

   
    let fileReader = new FileReader()

    fileReader.onloadend = function(e) {
        let arr = (new Uint8Array(e.target.result)).subarray(0, 4)
        
        let header = ""
        let type
        for(let i = 0; i < arr.length; i++) {
           header += arr[i].toString(16)
          
        }
        switch (header) {
          case "89504e47":
              type = "image/png"
              break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
              type = "image/jpeg"
              break;
          default:
              type = "unknown"
              break;
        }

        myResult = type
        
       

      }
      fileReader.readAsArrayBuffer(file)

      
      

}

