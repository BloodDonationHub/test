import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const BloodForm = () => {
  const [bloodTypes, setBloodTypes] = useState([]);
  const [donor, setDonor] = useState("");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch blood types from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/blood/types")
      .then((res) => setBloodTypes(res.data))
      .catch((err) => setError("Failed to fetch blood types"));
  }, []);

  // Check compatibility
  const handleCheck = (e) => {
    e.preventDefault();
    if (!donor || !recipient) {
      setError("Please select both donor and recipient");
      return;
    }
    axios
      .get(`http://localhost:5000/api/blood/compatibility/${donor}/${recipient}`)
      .then((res) => setResult(res.data))
      .catch((err) => setError("Error checking compatibility"));
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="mb-4">Blood Match Checker</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleCheck}>
        <Form.Group className="mb-3">
          <Form.Label>Donor Blood Type</Form.Label>
          <Form.Select
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
          >
            <option value="">Select Donor</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recipient Blood Type</Form.Label>
          <Form.Select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          >
            <option value="">Select Recipient</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Check Compatibility
        </Button>
      </Form>
      {result && (
        <div className="mt-4">
          <h4>Result:</h4>
          <p>
            Can <strong>{result.donor}</strong> donate to <strong>{result.recipient}</strong>?
          </p>
          <p
            style={{
              color: result.isCompatible ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {result.isCompatible ? "✅ Yes, compatible!" : "❌ No, incompatible!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BloodForm;