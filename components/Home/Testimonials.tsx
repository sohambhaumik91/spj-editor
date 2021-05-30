import Modal from '@components/common/Modal';
import React from 'react';
import SectionTitle from '../common/SectionTitle';

const Testimonials = () => {
  return (
    <div className="relative">
      <SectionTitle
        accent="green"
        feature="Testimonials"
        title="Hear it from our customers"
        description="Our design experts will transform any room in your home on our smart 3D desktop App. Shop handpicked products within your budget and style, directly from your room design, within Spacejoy."
      />
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto">
          <div className="shadow-sm bg-white p-4 h-32 w-64 rounded-xl flex items-center justify-center mx-5">
            <Modal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;