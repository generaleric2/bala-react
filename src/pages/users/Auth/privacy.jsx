import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 dark:text-black">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-black">1. Information We Collect</h2>
        <p className="mb-4 dark:text-black">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className='dark:text-black'>Name and contact information</li>
          <li className='dark:text-black'>Account credentials</li>
          <li className='dark:text-black'>Shopping preferences</li>
          <li className='dark:text-black'>Transaction history</li>
          <li className='dark:text-black'>Device and browsing information</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 dark:text-black">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4 dark:text-black">
          <li>Process your transactions</li>
          <li>Personalize your shopping experience</li>
          <li>Send promotional communications</li>
          <li>Improve our services</li>
          <li>Prevent fraud</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Service providers</li>
          <li>Marketing partners</li>
          <li>Legal authorities when required</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your data</li>
          <li>Correct your data</li>
          <li>Delete your data</li>
          <li>Opt-out of marketing</li>
        </ul>
      </section>
    </div>
  );
};