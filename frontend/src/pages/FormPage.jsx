import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import config from "../config";

const BACKEND_URL = config.backendUrl;

const fetchFormData = async (formData) => {
  const response = await fetch(`${BACKEND_URL}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
};


const FormPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    date: searchParams.get("date") || "",
    first_name: searchParams.get("first_name") || "",
    last_name: searchParams.get("last_name") || "",
  });

  const mutation = useMutation({
    mutationFn: fetchFormData,
    onSuccess: () => {
      setSearchParams(formData); // Save form state to URL if fields are valid
    },
  });

  useEffect(() => {
    // If fields are pre-filled from URL, fetch data immediately on page opening
    if (formData && formData.date && formData.first_name && formData.last_name) {
      mutation.mutate(formData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div>
      <h2>Form Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        <label>
          First Name:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={mutation.isPending}>Submit</button>
      </form>

      {mutation.isPending && <p aria-busy="true">Loading...</p>}

      {mutation.isError && (
        <div>
          <p>Error submitting the form:</p>
          <pre>{JSON.stringify(mutation.error.error, null, 2)}</pre>
        </div>
      )}

      {mutation.isSuccess && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(mutation.data?.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FormPage;
