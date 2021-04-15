const fields = document.querySelectorAll("[required]");

const ValidateField = (invalidTargetField) => {
  const verifyErrors = () => {
    let foundError = false;
    for (let error in invalidTargetField.validity) {
      if (
        invalidTargetField.validity[error] &&
        !invalidTargetField.validity.valid
      ) {
        foundError = error;
      }
    }
    return foundError;
  };

  const customMessage = (typeError) => {
    const messages = {
      text: {
        valueMissing: "Este campo é obrigatório",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "O campo de email deve conter um email válido",
      },
    };
    return messages[invalidTargetField.type][typeError];
  };

  const setCustomMessage = (message) => {
    const spanError = invalidTargetField.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  };

  return () => {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      invalidTargetField.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      invalidTargetField.style.borderColor = "green";
      setCustomMessage();
    }
  };
};

const customValidation = (event) => {
  const invalidTargetField = event.target;
  const validation = ValidateField(invalidTargetField);
  validation();
};

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}
