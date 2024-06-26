import { useState } from "react";
const { VITE_EMAIL_FORM_KEY } = import.meta.env;

function ContactForm() {
  //message to show when form is sent
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", VITE_EMAIL_FORM_KEY);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="md:flex flex-col items-center">
      <div className="flex flex-col shadow-2xl p-8 rounded-2xl gap-4 md:w-[100%]">
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <label>First Name:</label>
          <input className="border rounded-md" type="text" name="name" required />
          <label>Last Name:</label>
          <input type="text" name="lastName" className="border rounded-md" required />
          <label>Email:</label>
          <input type="text" name="email" className="border rounded-md" required />
          <label>What can we help you with?</label>
          <textarea name="message" className="border rounded-md" required></textarea>
          <button className="bg-zinc-900 text-white w-[130px] p-1.5 rounded-xl" type="submit">
            Send Message
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
}

export default ContactForm;
