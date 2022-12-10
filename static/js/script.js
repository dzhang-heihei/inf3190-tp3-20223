// L'endroit où placer le code du front-end.
function searchForm() {
  if (formValidation()) {
    document.forms["formulaire"].submit();
  } else {
    return false;
  }
}

function handleErrorImg(e) {
  e.src = "/images/coming.jpeg"
}