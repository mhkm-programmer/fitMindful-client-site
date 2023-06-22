import React from 'react';
import { useTrail, animated } from 'react-spring';
import PageTitle from '../../Shared/PageTitle/PageTitle';

const Terms = () => {
  const contentTrail = useTrail(7, {
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    delay: 200,
  });

  return (
    <div>
      <PageTitle title="FitMindful | Terms & Condition" />

      <div className='container mx-auto pb-24 pt-10 px-16'>
        <h2 className='text-center text-[#409F00] h2 pb-8'>Terms and Condition</h2>
        {contentTrail.map((props, index) => (
          <animated.p key={index} style={props} className="mb-6">
            {getContent(index)}
          </animated.p>
        ))}
      </div>
    </div>
  );
};

// Helper function to get the content for each paragraph
const getContent = (index) => {
  switch (index) {
    case 0:
      return (
        <>
          Welcome to FitMindful! By using our website, you agree to the following terms and conditions:
        </>
      );
    case 1:
      return (
        <>
          Content: All content on our website, including but not limited to recipes, images, videos, and articles, is protected by copyright and may not be reproduced or distributed without our written permission.
        </>
      );
    case 2:
      return (
        <>
          Accuracy: We make every effort to ensure the accuracy and completeness of our content, but we make no guarantees or warranties as to its accuracy or suitability for any particular purpose.
        </>
      );
    case 3:
      return (
        <>
          Liability: We are not liable for any damages or losses that may result from your use of our website, including but not limited to direct, indirect, consequential, or incidental damages.
        </>
      );
    case 4:
      return (
        <>
          User-generated content: Any content that you post or upload to our website, including comments, reviews, and ratings, must be your original work and must not infringe on any third-party rights. We reserve the right to remove any content that we deem inappropriate or offensive.
        </>
      );
    case 5:
      return (
        <>
          Privacy: We take your privacy seriously and will not share your personal information with third parties without your consent. Please see our Privacy Policy for more information.
        </>
      );
    case 6:
      return (
        <>
          Changes: We reserve the right to update or modify these terms and conditions at any time, without prior notice. By continuing to use our website, you agree to be bound by the updated terms and conditions.
        </>
      );
    case 7:
      return (
        <>
          If you have any questions or concerns about these terms and conditions, please contact us at support@FitMindful.com. Thank you for using FitMindful!"
        </>
      );
    default:
      return null;
  }
};

export default Terms;
