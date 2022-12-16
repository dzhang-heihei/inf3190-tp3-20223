// L'endroit où placer le code du front-end.
function submitForm() {
  if (formValidation()) {
    document.forms["formulaire"].submit();
  } else {
    return false;
  }
}

function formValidation() {
  clearAllErrorMessage();
  let validate = formElementsValidation();

  return validate;
}

function formElementsValidation() {
  const fieldEmptyMessage = "Le champ ne doit pas être vide.";
  const emailFormatMessage = "Le courriel n'est pas du bon format.";
  const postalFormatMessage = "Le code postal n'est pas du bon format.";
  const commaFormatMessage = "Ne peut pas contenir de virgule";
  const ageMessage = "L'age doit être 0 et 30";
  const nameMessage = "Le nom de l'animal doit avoir entre 3 et 20 caractères";

  let validated = true;
  let emailRegx = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
  let postalRegx = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)

  let commaEx = new RegExp('^[^,]+$');
  let form = document.forms["formulaire"];


  let animalName = form["animal_name"].value;
  let specieVal = form["animal_specie"].value;
  let raceVal = form["animal_race"].value;
  let ageVal = form["animal_age"].value;
  let emailVal = form["email"].value;
  let addresseVal = form["addresse"].value;
  let cityVal = form["city"].value;
  let postalVal = form["postal"].value;
  let descriptionVal = form["description"].value;




  // animal name validation
  if(animalName == "") {
    document.getElementById("animal-name-err").innerHTML = fieldEmptyMessage;
    validated = false;
  } else if (animalName.length < 3 || animalName.length > 20) {
    document.getElementById("animal-name-err").innerHTML = nameMessage;
    validated = false
  }

  // specie validation
  if (specieVal == "") {
    document.getElementById("specie-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }

  // race validation
  if (raceVal == "") {
    document.getElementById("race-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }

  // age validation
  if (ageVal == "") {
    document.getElementById("age-err").innerHTML = fieldEmptyMessage;
    validated = false;
  } else if (ageVal < 0 || ageVal > 30) {
    document.getElementById("age-err").innerHTML = ageMessage;
    validated = false;
  }

  // email validation
  if(emailVal == "") {
    document.getElementById("email-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }else if (!emailRegx.test(emailVal)) {
    document.getElementById("email-err").innerHTML = nameFormatMessage;
    validated = false;
  }

  // addresse validation
  if (addresseVal == "") {
    document.getElementById("addresse-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }
  // city validation
  if (cityVal == "") {
    document.getElementById("city-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }

  // postal code validation
  if (postalVal == "") {
    document.getElementById("postal-err").innerHTML = fieldEmptyMessage;
    validated = false;
  } else if (!postalRegx.test(postalVal)) {
    document.getElementById("postal-err").innerHTML = postalFormatMessage;
    validated = false
  }

  // description validation
  if (descriptionVal == "") {
    document.getElementById("description-err").innerHTML = fieldEmptyMessage;
    validated = false;
  }

  return validated;
}

function clearAllErrorMessage() {
  let errorSpans = [...document.getElementsByClassName("error")];

  errorSpans.forEach((span) => {
    span.innerHTML = " ";
  });
}

function handleErrorImg(e) {
  e.src = "/images/coming.jpeg"
}

