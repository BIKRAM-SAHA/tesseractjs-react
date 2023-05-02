import { useState } from "react";
import doOCR from "../helpers/ocr";
import "./ImageForm.css";

function ImageForm() {
  const [files, setFiles] = useState();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resultArray = [];
    for (const file of files) {
      const objectUrl = URL.createObjectURL(file);
      setCount((prevCount) => prevCount + 1);
      const [err, result] = await doOCR(objectUrl, setProgress);
      if (err) {
        console.log(err);
        throw new Error("something went wrong");
      }
      resultArray.push(result);
    }
    setCount(0);
    setProgress(0);
    setIsLoading(false);
    setResults([...resultArray]);
  };

  return (
    <div>
      <h1>Upload Images</h1>
      <ul>
        <li>
          Ensure images are preferably of high quality with black text on white
          background
        </li>
        <li>Prefer the text not to be in Curly fonts</li>
        <li>Too much noise in the image might effect the results</li>
        <li>Text to be in english</li>
      </ul>
      <form>
        <label htmlFor="images">Images</label>
        <input type="file" name="images" onChange={handleFileChange} multiple />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div className="result">
        {isLoading ? (
          <>
            processing {count}/{files.length}
            <progress value={progress} max="100"></progress>
          </>
        ) : (
          <>
            {results.map((element, index) => {
              return (
                <div key={index}>
                  <h4>File Start</h4>
                  <pre>{element}</pre>
                  <h4>File End</h4>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default ImageForm;
