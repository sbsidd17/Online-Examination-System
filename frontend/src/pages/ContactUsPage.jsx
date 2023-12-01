

const ContactUsPage = () => {
  return (
    <div className="mt-[70px] w-full bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          Have a question, suggestion, or just want to say hello? Reach out to
          us! Fill out the form below, and we'll get back to you as soon as
          possible.
        </p>
        <form className="mb-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#0ad0f4] text-white py-2 px-4 rounded-md hover:bg-[#06a9c6] transition-all duration-200"
          >
            Send Message
          </button>
        </form>
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> info@gyaanbook.com
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong> +91 123 456 7890
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong> 123 Street, Cityville, Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
