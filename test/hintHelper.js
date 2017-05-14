export default (assertion, hint) => {
  const hintText = hint || '';
  try{
    assertion()
  } catch(e) {
    if(e.name === "TypeError") {
      throw new Error(
        e + '\n\t' +
        typeErrorHint
      );
    }
    else{
      throw new Error(
        e + '\n\t' +
        hintText
      )
    }
  }
}

const typeErrorHint = '**HINT**:Your DOMNode may be having trouble appending to the root. Try returning an HTML element, like this: \n\tdocument.createElement("div").';