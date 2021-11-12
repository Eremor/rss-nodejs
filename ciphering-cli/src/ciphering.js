const encodingCaesar = (string) => {
  const arr = string.split('');
  const result = arr.map(elem => {
    const charCode = elem.charCodeAt(0);

    if(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if(charCode == 90 || charCode == 122) {
        return elem = String.fromCharCode(charCode - 25);
      }
      elem = String.fromCharCode(charCode + 1);
    }

    return elem;
  });

  return result.join('');
};

const decodingCaesar = (string) => {
  const arr = string.split('');
  const result = arr.map(elem => {
    const charCode = elem.charCodeAt(0);

    if(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if(charCode == 65 || charCode == 97) {
        return elem = String.fromCharCode(charCode + 25);
      }
      elem = String.fromCharCode(charCode - 1);
    }

    return elem;
  });

  return result.join('');
};

const encodingROT8 = (string) => {
  const arr = string.split('');
  const result = arr.map(elem => {
    const charCode = elem.charCodeAt(0);

    if(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if(charCode >= 83 && charCode <= 90 || charCode >= 115 && charCode <= 122) {
        return elem = String.fromCharCode(charCode - 18);
      }
      elem = String.fromCharCode(charCode + 8);
    }

    return elem;
  });

  return result.join('');
};

const decodingROT8 = (string) => {
  const arr = string.split('');
  const result = arr.map(elem => {
    const charCode = elem.charCodeAt(0);

    if(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if(charCode >= 65 && charCode <= 72 || charCode >= 97 && charCode <= 104) {
        return elem = String.fromCharCode(charCode + 18);
      }
      elem = String.fromCharCode(charCode - 8);
    }

    return elem;
  });

  return result.join('');
};

const atbash = (string) => {
  const arr = string.split('');
  const result = arr.map(elem => {
    const charCode = elem.charCodeAt(0);

    if(charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
      if(charCode >= 65 && charCode <= 77) {
        elem = String.fromCharCode(155 - charCode);
      } else if (charCode >= 78 && charCode <= 90) {
        elem = String.fromCharCode(155 - charCode);
      } else if(charCode >= 97 && charCode <= 109) {
        elem = String.fromCharCode(219 - charCode);
      } else if(charCode >= 110 && charCode <= 122) {
        elem = String.fromCharCode(219 - charCode);
      }
    }

    return elem;
  });

  return result.join('');
};

export const cipher = (flag, phrase) => {
  switch(flag) {
    case 'C1':
      phrase = encodingCaesar(phrase);
      break;
    case 'C0':
      phrase = decodingCaesar(phrase);
      break;
    case 'R1':
      phrase = encodingROT8(phrase);
      break;
    case 'R0':
      phrase = decodingROT8(phrase);
      break;
    case 'A':
      phrase = atbash(phrase);
      break;
  }

  return phrase;
}