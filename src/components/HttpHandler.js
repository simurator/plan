import React, { useState } from "react";
import axios from "axios";

const HttpHandler = () => {
  const [response, setResponse] = useState("");

  const handleGet = async () => {
    try {
      const res = await axios.get("/api/schedule");
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const handlePost = async () => {
    try {
      const res = await axios.post("/api/schedule", {
        day: "Monday",
        lesson: { subject: "Science", time: "12:00", teacher: "Dr. Who", room: 42 },
      });
      setResponse(`Posted: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const handlePut = async () => {
    try {
      const res = await axios.put("/api/schedule/1", {
        subject: "Updated Science",
        teacher: "Dr. Who Updated",
      });
      setResponse(`Updated: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete("/api/schedule/1");
      setResponse(`Deleted: ${JSON.stringify(res.data)}`);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>HTTP Handler</h2>
      <button onClick={handleGet}>GET</button>
      <button onClick={handlePost}>POST</button>
      <button onClick={handlePut}>PUT</button>
      <button onClick={handleDelete}>DELETE</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default HttpHandler;
