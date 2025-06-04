function doPost(request = {}) {
  const { parameter, postData: { contents, type } = {} } = request;
  const { dataReq = {} } = JSON.parse(contents); //content
  const { fname = {} } = JSON.parse(contents); //function name

  const response = {
    status: "function not found: " + fname, // prepare response in function not found
    data2: dataReq     
  }
  switch (fname) { //function selection
    case 'uploadFilesToGoogleDrive':
      var output = JSON.stringify(uploadFilesToGoogleDrive(dataReq.data, dataReq.name, dataReq.type, dataReq.folderName)) //call function with data, name and type from request
      break
    default:
      var output = JSON.stringify(response)
      break
  }
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON); //response to frontend
}

function uploadFilesToGoogleDrive(data, name, type, folderName) {
  switch (folderName) {
    case 'career':
      var folderId = "11iYkM63JPV6xF9xvv3mfVPcPNFB9y0yw"
      break
    case 'consultant':
      var folderId = "1Vq7tpw-7VafkdrLOdgHC0vZ--D7icU4d"
      break
    case 'offer':
      var folderId = "12AXhIwH9RAD5AHob4Uir--FGNfobIUy3"
      break
    default:
      var folderId = "16r6QDBMuXrjLzDIA7lyyHufOWgLR3Oea"
      break
  }

  var datafile = Utilities.base64Decode(data)  // convert to Binary (from Base4) Utilities is native from AppsScript
  var blob = Utilities.newBlob(datafile, type, name); // structure the file
  var folder = DriveApp.getFolderById(folderId); //select folder to save
  var newFile = folder.createFile(blob); // create and save
  newFile.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); // set permision to anyone to view
  var url = newFile.getUrl() //get the file URL to share
  var id = newFile.getId()
  let obj = { url, id, folderName } //prepare object to response
  return obj
}