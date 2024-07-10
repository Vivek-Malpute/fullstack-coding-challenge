// components/AmbulanceForm.tsx
import React, { useState } from "react";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
  FormTextArea,
} from "../styled-componet/AmbulanceForm.style";

interface AmbulanceFormProps {
  onSubmit: (formData: AmbulanceFormData) => void;
  initialValues?: AmbulanceFormData;
}

interface AmbulanceFormData {
  title: string;
  description: string;
  location: string;
  vehNum: string
}

const AmbulanceForm: React.FC<AmbulanceFormProps> = ({
  onSubmit,
  initialValues = { title: "", description: "", location: "", vehNum:"" },
}) => {
  const [formData, setFormData] = useState<AmbulanceFormData>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally, clear the form after submission
    setFormData({ title: "", description: "", location: "",vehNum:"" });
  };

  return (
    
    <FormContainer>
      <h1>Add Ambulance</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel>Title:</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Description:</FormLabel>
          <FormTextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div>
          <FormLabel>Location:</FormLabel>
          <FormInput
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Vehicle Number:</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={formData.vehNum}
            onChange={handleChange}
            required
          />
        </div>
        <FormButton type="submit">Submit</FormButton>
      </form>
    </FormContainer>
  );
};

export default AmbulanceForm;
