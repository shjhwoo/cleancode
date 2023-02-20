function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream);
  getPhotoDivElement(outStream, person.photo);
}

function renderPhoto(outStream) {
  //??
  outStream.write("");
}

function getPhotoDivElement(outStream, photo) {
  renderDivWrapper();
  emitPhotoData(outStream, photo);
  renderDivWrapper();
}

function renderDivWrapper() {
  outStream.write("<div>\n");
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`);
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>location: ${photo.location}</p>\n`);
}

function recentDateCutoff() {
  //7 days ago.
  return new Date().setDate(new Date().getDate() - 7);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((p) => p.date > recentDateCutoff())
    .forEach((p) => {
      getPhotoDivElement(outStream, p.photo);
    });
}
