import Tesseract from "tesseract.js";

const doOCR = (imageLike, handleProgress) => {
  try {
    return Tesseract.recognize(imageLike, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          handleProgress((m.progress * 100).toFixed(2));
        }
      },
    }).then(({ data: { text } }) => {
      return [null, text];
    });
  } catch (err) {
    return [err, null];
  }
};

export default doOCR;
