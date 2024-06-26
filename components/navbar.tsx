'use client';

import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentRole';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import {
  MdHome,
  MdHowToReg,
  MdOutlineSearch,
  MdSettings,
} from 'react-icons/md';

interface NavbarProps {
  user: User;
}

const Navbar: FC<NavbarProps> = ({ user }) => {
  const sessionUser = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname.startsWith('/onboarding')) {
    return null;
  }

  return (
    <nav className='sticky top-0 z-50 bg-secondary flex justify-between items-center p-4 rounded-xl w-full shadow-sm mb-5'>
      <div className='flex justify-between w-full gap-x-2'>
        <div className='cursor-pointer' onClick={() => router.push('/')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='82'
            height='40'
            fill='none'
            viewBox='0 0 82 40'
            className='sm:w-[60px] md:w-[82px]'
          >
            <path
              fill='#FFD43D'
              d='M73.365 19.71c0 2.904-2.241 5.31-5.27 5.31-3.03 0-5.228-2.406-5.228-5.31 0-2.905 2.199-5.312 5.228-5.312s5.27 2.407 5.27 5.311Z'
            ></path>
            <path
              fill='#FF0C81'
              d='M48.764 19.544c0 2.946-2.323 5.145-5.27 5.145-2.904 0-5.227-2.2-5.227-5.145 0-2.947 2.323-5.104 5.228-5.104 2.946 0 5.27 2.158 5.27 5.104Z'
            ></path>
            <path
              fill='#11EEFC'
              d='M20.074 25.02c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312Z'
            ></path>
            <path
              fill='#171A26'
              d='M68.095 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.855-10.83 11.12-10.83 6.349 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.03 0 5.27-2.406 5.27-5.31 0-2.905-2.24-5.312-5.27-5.312-3.029 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM43.08 40c-4.813 0-8.506-2.116-10.373-5.934l4.896-2.655c.913 1.784 2.614 3.195 5.394 3.195 3.486 0 5.85-2.448 5.85-6.473v-.374c-1.12 1.411-3.111 2.49-6.016 2.49-5.768 0-10.373-4.481-10.373-10.581 0-5.934 4.813-10.788 11.12-10.788 6.431 0 11.162 4.605 11.162 10.788v8.299C54.74 35.27 49.76 40 43.08 40Zm.415-15.311c2.946 0 5.27-2.2 5.27-5.145 0-2.947-2.324-5.104-5.27-5.104-2.905 0-5.228 2.158-5.228 5.104s2.323 5.145 5.228 5.145ZM20.074 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.854-10.83 11.12-10.83 6.348 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM0 0h5.892v30H0V0ZM82 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'
            ></path>
          </svg>
        </div>
        <div className='space-x-3 mr-3'>
          {sessionUser && (
            <>
              <Button
                asChild
                variant={pathname === '/dashboard' ? 'default' : 'outline'}
                className='sm:px-2 sm:h-8 md:px-4 md:h-10'
              >
                <Link href='/dashboard'>
                  <MdHome className='sm:text-[16px] md:text-[20px] mr-1' /> Home
                </Link>
              </Button>

              <Button
                asChild
                variant={
                  pathname.startsWith('/matches') ? 'default' : 'outline'
                }
                className='sm:px-2 sm:h-8 md:px-4 md:h-10'
              >
                <Link href='/matches/all-matches'>
                  <MdHowToReg className='sm:text-[16px] md:text-[20px] mr-1' />{' '}
                  Matches
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname === '/search' ? 'default' : 'outline'}
                className='sm:px-2 sm:h-8 md:px-4 md:h-10'
              >
                <Link href='/search'>
                  <MdOutlineSearch className='sm:text-[16px] md:text-[20px] mr-1' />{' '}
                  Search
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname.startsWith('/chat') ? 'default' : 'outline'}
                className='sm:px-2 sm:h-8 md:px-4 md:h-10'
              >
                <Link href='/chat'>
                  <IoChatbubbleEllipses className='sm:text-[16px] md:text-[20px] mr-1' />{' '}
                  Chat
                </Link>
              </Button>
              <Button
                asChild
                variant={pathname === '/settings' ? 'default' : 'outline'}
                className='sm:px-2 sm:h-8 md:px-4 md:h-10'
              >
                <Link href='/settings'>
                  <MdSettings className='sm:text-[16px] md:text-[20px] mr-1' />{' '}
                  Settings
                </Link>
              </Button>
            </>
          )}

          {!sessionUser && (
            <>
              <Button
                asChild
                variant={pathname === '/about' ? 'default' : 'outline'}
              >
                <Link href='/about'>About Us</Link>
              </Button>
              <Button
                asChild
                variant={pathname === '/services' ? 'default' : 'outline'}
              >
                <Link href='/services'>Services</Link>
              </Button>
              <Button
                asChild
                variant={pathname === '/careers' ? 'default' : 'outline'}
              >
                <Link href='/careers'>Careers</Link>
              </Button>
              <Button
                asChild
                variant={pathname === '/contact' ? 'default' : 'outline'}
              >
                <Link href='/contact'>Contact Us</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <UserButton user={user} />
    </nav>
  );
};

export default Navbar;
