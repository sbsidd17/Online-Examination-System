import GyanBookLogo from "../assets/logo/GyanBookLogo.png";

const AboutPage = () => {
  return (
    <div className="mt-[70px] w-full bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-semibold mb-4">About Gyaan Book</h2>
        <p className="text-gray-600 mb-6">
          Welcome to Gyaan Book, your go-to platform for hassle-free online
          examinations. We are dedicated to providing a seamless experience for
          students and professionals seeking to enhance their knowledge through
          interactive online tests.
        </p>
        <img
          src={GyanBookLogo}
          alt="Gyaan Book Logo"
          className="mb-6 rounded-md shadow-md"
          style={{ maxWidth: "100%" }}
        />
        <h3 className="text-xl font-semibold mb-4">Features</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Explore a variety of available exam test series.</li>
          <li>Purchase passes to unlock and access all available exams.</li>
          <li>Take online tests at your convenience.</li>
          <li>Track your progress with detailed performance analytics.</li>
        </ul>
        <p className="text-gray-600 mb-6">
          Our platform is designed to make your learning journey enjoyable and
          efficient. Whether you are preparing for competitive exams or
          enhancing your skills, Gyaan Book has got you covered.
        </p>
        <p className="text-gray-600 mb-6">
          Join us on this educational adventure and empower yourself with
          knowledge. Gyaan Book - Your Gateway to Success!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
