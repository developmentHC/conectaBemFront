'use client';

import FacebookSign from './FacebookLogin';
import { GoogleLogin } from './GoogleLogin';

export const SocialNetwork = () => {
  return (
    <div className="flex flex-col gap-6">
      <GoogleLogin />

      <FacebookSign />
    </div>
  );
};
