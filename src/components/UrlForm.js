import { useState } from "react";
import axios from "axios";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/shorten", url, {
        headers: { "Content-Type": "text/plain" },
      });
      setShortened(res.data);
    } catch (err) {
      alert("Invalid URL or server error!");
    }
  };

  const RedirectPage = () => {
    fetch(`http://localhost:8080/${shortened}`)
      .then((res)=>res.text())
      .then((res) => {
        if (res == "NOT_FOUND" || res == "EXPIRED"){
         const message = (res == "EXPIRED")?"This URL has expired. ⏳":"This short URL does not exist. 🚫";
          alert(message);
          setUrl('');
          setShortened('');
        }else{ window.location.replace(res);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <center>
      <div>
        <h2>URL Shortener</h2>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <button onClick={handleSubmit}>Shorten</button>

        {shortened && (
          <p>
            Short URL:{" "}
            <a
              onClick={RedirectPage}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              http://localhost:8080/{shortened}
            </a>
          </p>
        )}
      </div>
    </center>
  );
}
