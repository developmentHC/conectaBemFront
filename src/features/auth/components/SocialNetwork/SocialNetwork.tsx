'use client';

import FacebookLogin from './FacebookLogin';
import { GoogleLogin } from './GoogleLogin';

export const SocialNetwork = () => {
  return (
    <div className="flex flex-col gap-6">
      <GoogleLogin />

      <FacebookLogin />
    </div>
  );
};
