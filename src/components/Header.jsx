import { useEthers } from '@usedapp/core';
import ConnectWalletButton from './ConnectWalletButton.jsx';

const Header = () => {

  const { account, activateBrowserWallet, deactivate } = useEthers();

  const connectWallet = () => {
    activateBrowserWallet();
  };

  const disconnectWallet = () => {
    // call the deactivate function
    deactivate();
  };

  const formatWalletAddress = (address) => {
    if (!address || address.length < 11) {
      return address; // or return a default value like 'Invalid address'
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <div className="flex gap-5 justify-between px-7 pt-1 w-full bg-black border-b-2 border-pros-green border-solid max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="/logo.png"
        className="shrink-0 max-w-full w-[100px] h-[90px]"
        alt="Logo"
      />
      <div className="flex gap-3.5 my-auto">

        {/* <a href="https://t.me/PrintArb" target="_blank" rel="noopener noreferrer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/64f4b119f2d68feeeb4544a6183310abce3611a0d4dac63c79c9996d24335465?apiKey=3d80085cc7b449c585d0aa2482d4701d&"
            className="shrink-0 w-[47px]"
            alt="Icon"
          />
        </a>

        <a href="https://twitter.com/ArbPrintoffical" target="_blank" rel="noopener noreferrer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db3c700b6f649e174f5134ec3f83ca21156320630cd7b81bddbf700ce5e5d45b?apiKey=3d80085cc7b449c585d0aa2482d4701d&"
            className="shrink-0 w-[47px]"
            alt="Icon"
          />
        </a> */}
        {account ? (
            // call the logWallet function
            <button onClick={disconnectWallet} className='bg-transparent'>
              <ConnectWalletButton text={formatWalletAddress(account)} />
            </button>
        ) : (
          <button onClick={connectWallet} className='bg-transparent'>
            <ConnectWalletButton text={"CONNECT WALLET"} />
          </button>
        )
        }
      </div>
    </div>
  );
};

export default Header;