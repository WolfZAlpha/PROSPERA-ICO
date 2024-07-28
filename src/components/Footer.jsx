const Footer = () => {
    return (
      <div className="flex gap-5 justify-between px-6 pt-1 w-full text-2xl text-right text-white bg-black border-t-2 border-pros-green border-solid max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="/logo.png"
          className="shrink-0 max-w-full w-[100px]"
          alt="Logo"
        />
        <div className="flex-auto my-auto max-md:max-w-full">
          © 2024, $PROS, All Rights Reserved
        </div>
      </div>
    );
  };

  export default Footer;