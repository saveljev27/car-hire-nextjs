'use client';

import Image from 'next/image';
import Link from 'next/link';

import { footerLinks } from '@/shared/constants';

export const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </div>
        <div className="footer__links">
          {footerLinks.map((link, index) => (
            <div key={index} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500  hover:text-primary-red"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>@2024 CarHire. All Rights Reserved &copy;</p>
        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500  hover:text-primary-red">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500  hover:text-primary-red">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};
