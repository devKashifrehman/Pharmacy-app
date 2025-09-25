import React, { useState } from "react";
import "./Contactus.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const validate = (values) => {
    const errs = {};

    if (!values.name.trim()) errs.name = "Name is required.";
    if (!values.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = "Enter a valid email address.";
    }

    if (values.phone && !/^[0-9+\-\s]{7,16}$/.test(values.phone)) {
      errs.phone = "Enter a valid phone number (digits, +, - allowed).";
    }

    if (!values.subject.trim()) errs.subject = "Subject is required.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }

    if (!values.consent) errs.consent = "Please allow us to contact you.";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      return;
    }

    // Replace this with real API call / email sending
    // For now we simulate success:
    setTimeout(() => {
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
      });
    }, 600);
  };

  return (
    <div className="contact-form-wrap" aria-live="polite">
        <br/>
        <br/>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <h2>Contact Us</h2>

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
        />
        {errors.name && (
          <div id="err-name" className="cf-error">{errors.name}</div>
        )}

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "err-email" : undefined}
        />
        {errors.email && (
          <div id="err-email" className="cf-error">{errors.email}</div>
        )}

        <label htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+92 300 0000000"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "err-phone" : undefined}
        />
        {errors.phone && (
          <div id="err-phone" className="cf-error">{errors.phone}</div>
        )}

        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          placeholder="Short reason (e.g., Prescription refill)"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "err-subject" : undefined}
        />
        {errors.subject && (
          <div id="err-subject" className="cf-error">{errors.subject}</div>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && (
          <div id="err-message" className="cf-error">{errors.message}</div>
        )}

        <div className="cf-consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={handleChange}
          />
          <label htmlFor="consent" className="consent-label">
            I agree to be contacted regarding this inquiry.
          </label>
        </div>
        {errors.consent && (
          <div className="cf-error">{errors.consent}</div>
        )}

        <div className="cf-actions">
          <button type="submit" className="cf-submit">Send Message</button>
        </div>

        {status === "success" && (
          <div className="cf-success" role="status">Thanks — your message was sent.</div>
        )}
        {status === "error" && (
          <div className="cf-fail" role="alert">Please fix the errors above.</div>
        )}
      </form>
    </div>
  );
}
