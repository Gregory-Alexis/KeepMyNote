const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white flex justify-center p-4'>
      <p className='text-sm'>© {new Date().getFullYear()} Keep My Notes. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
