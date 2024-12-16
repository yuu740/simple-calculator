import React, { useState } from "react";
import "./styles/Support.style.css";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    topic: "",
    description: "",
  });
  const randomTicketNumber = Math.floor(1000 + Math.random() * 9000);
  const formattedTicketNumber = randomTicketNumber.toString().padStart(4, "0");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(formattedTicketNumber);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const isFormValid =
    formData.firstName && formData.email && formData.topic && !isSubmitting;

  return (
    <div className="support-container">
      <h1>Support Ticket Form</h1>
      <hr />
      {isSubmitted ? (
        <div className="response-system">
          <p className="thank-you">
            Thank you for sending us your report, we will track the problem now
          </p>
          <div className="ticket-number">
            <p className="ticket-label">ticket number: </p>
            {ticketNumber && <p>{ticketNumber}</p>}
          </div>
        </div>
      ) : (
        <form id="supportForm" onSubmit={handleSubmit}>
          <div className="left-container">
            <div className="form-group">
              <label htmlFor="firstName">
                Name <span className="red">*</span>
              </label>
              <div className="name-fields">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <p className="label-name">First</p>
                </div>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <p className="label-name">Last</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email <span className="red">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Topic <span className="red">*</span>
              </label>
              <div className="topic-box">
                <label>What can we help you today?</label>
                <div className="child-topic">
                  <input
                    type="radio"
                    id="general"
                    name="topic"
                    value="General"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="general">General</label>
                </div>
                <div className="child-topic">
                  <input
                    type="radio"
                    id="bug"
                    name="topic"
                    value="Bug"
                    onChange={handleChange}
                  />
                  <label htmlFor="bug">Bug</label>
                </div>
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="form-group">
              <label htmlFor="description">
                Description{" "}
                <span className="optional">
                  <sup>optional</sup>
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description Report"
              ></textarea>
            </div>

            <button
              type="submit"
              id="submitButton"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "SEND"}
            </button>
          </div>
        </form>
      )}
      ;
    </div>
  );
};

export default SupportPage;
