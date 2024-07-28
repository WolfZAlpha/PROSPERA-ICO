import { useState, useEffect, forwardRef } from "react";
import './App.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Snackbar, LinearProgress, Box, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import ParbAbi from "./pros_abi.json";

const presaleContractAddress = "0x1806CD54631309778dE011A3ceeE6F88CA9c8DAf";

const useIcoData = () => {
  const { account, library } = useEthers();
  const [icoData, setIcoData] = useState({
    currentTier: "Tier1",
    tokensSold: 0,
    tokensAvailable: 0,
    tokenPrice: 0,
  });

  useEffect(() => {
    if (!account || !library) return;

    const contract = new ethers.Contract(presaleContractAddress, ParbAbi, library);
    const fetchIcoData = async () => {
      try {
        const currentTier = await contract.getCurrentTier();
        const tokensSold = await contract.getTokensSold();
        const tokensAvailable = await contract.getTokensAvailable();
        const tokenPrice = await contract.getTokenPrice();

        setIcoData({
          currentTier: `Tier${currentTier + 1}`,
          tokensSold: ethers.utils.formatUnits(tokensSold, 18),
          tokensAvailable: ethers.utils.formatUnits(tokensAvailable, 18),
          tokenPrice: ethers.utils.formatUnits(tokenPrice, "ether"),
        });
      } catch (error) {
        console.error('Error fetching ICO data:', error);
      }
    };

    fetchIcoData();
  }, [account, library]);

  return icoData;
};


const ProgressBar = ({ current, goal }) => {
  const progress = (current / goal) * 100;

  return (
    <Box sx={{ width: '100%', position: 'relative', bgcolor: 'black', border: '2px solid #01ff02', mt: 5 }}
      className="rounded-md shadow-green-500/50 shadow-[0_0_15px_5px_rgba(0,255,0,0.5)]"
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '45px',
          bgcolor: 'black',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#01ff02'
          }
        }}
      />
      <Box sx={{ position: 'absolute', top: '50%', left: '4px', transform: 'translateY(-50%)', color: 'white' }}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            WebkitTextStroke: '.5px black',
            WebkitTextFillColor: 'white'
          }}
        >
          {current} $PROS
        </Typography>
      </Box>
      <Box sx={{ position: 'absolute', top: '50%', right: '4px', transform: 'translateY(-50%)', color: 'white' }}>
        <Typography
          variant="body2"
          noWrap
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            WebkitTextStroke: '.5px black',
            WebkitTextFillColor: 'white'
          }}
        >
          {goal} $PROS
        </Typography>
      </Box>
    </Box>
  );
};

function App() {
  const { account, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const icoData = useIcoData();

  const [amount, setAmount] = useState(0.0);
  const [status, setStatus] = useState('ACTIVE');
  const [saleType, setSaleType] = useState('PUBLIC');
  const [minBuy, setMinBuy] = useState('1 $PROS');
  const [maxBuy, setMaxBuy] = useState('20m $PROS');
  const [walletInfo, setWalletInfo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleError = (message) => {
    setErrorMessage(message);
    setOpenSnackbar(true);
  };

  const handleWalletConnect = (account) => {
    setWalletInfo(account);
    console.log("Wallet Info: ", account);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    const reg = /^\d*\.?\d*$/;

    if (reg.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxAmount = async () => {
    if (!account || !library) {
      handleError("Please connect your wallet to fetch available amount.");
      return;
    }
  
    try {
      const signer = library.getSigner(account);
      const contract = new ethers.Contract(presaleContractAddress, ParbAbi, signer);
      const availablePros = await contract.singleAddressCheckProsAmountAvailable();
      const formattedAvailablePros = ethers.utils.formatUnits(availablePros, 18);
      setAmount(formattedAvailablePros);
    } catch (error) {
      handleError("Failed to fetch available amount.");
    }
  };
  
  const handleBuy = async () => {
    if (!account) {
      handleError("Please connect your wallet to purchase tokens.");
      return;
    }
  
    try {
      const signer = library.getSigner(account);
      const contract = new ethers.Contract(presaleContractAddress, ParbAbi, signer);
      const tokenAmount = ethers.utils.parseUnits(amount.toString(), 18);
      const cost = tokenAmount.mul(ethers.utils.parseUnits(icoData.tokenPrice, "ether")).div(ethers.utils.parseUnits("1", 18));
  
      const transaction = await contract.buyTokens(tokenAmount, {
        value: cost
      });
  
      await transaction.wait();
      console.log("Tokens purchased successfully!");
    } catch (error) {
      handleError("Failed to purchase tokens.");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header onWalletConnect={handleWalletConnect} />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%', fontSize: '1.25rem' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <main className="flex-grow w-full flex justify-center items-center px-4 py-5 sm:px-20 md:pt-20 md:pb-10 md:mt-28 md:mb-28">
        <div className="flex overflow-hidden relative flex-col self-center px-4 py-5 sm:px-20 md:pt-20 md:pb-10 md:mt-28 md:mb-28 w-full sm:max-w-[56vw] shadow-2xl fill-black border-2 border-pros-green rounded-3xl shadow-green-500/50 shadow-[0_0_150px_15px_rgba(0,255,0,0.5)]">
          <div className="relative self-center mt-14 text-2xl font-semibold leading-10 text-center text-pros-green uppercase max-md:mt-10 max-md:max-w-full">
            PRESALE ACTIVE NOW!
          </div>
          <div className="md:mt-7 w-full">
            <ProgressBar current={icoData.tokensSold} goal={icoData.tokensAvailable} />
          </div>

          {/* Dual Subsection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 mb-20 items-center">
            <div className="bg-black p-4 shadow-md rounded-lg border border-pros-green flex flex-col justify-center h-full rounded-xl shadow-green-500/50 shadow-[0_0_15px_5px_rgba(0,255,0,0.5)]">
              <h2 className="text-3xl font-semibold text-pros-green text-center">Token Information</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xl">
                  <span>Status:</span>
                  <span>{status}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Sale Type:</span>
                  <span>{saleType}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Min Buy:</span>
                  <span>{minBuy}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <span>Max Buy:</span>
                  <span>{maxBuy}</span>
                </div>
              </div>
            </div>

            <div className="bg-black p-10 shadow-md rounded-lg border border-pros-green flex flex-col justify-center h-full rounded-xl shadow-green-500/50 shadow-[0_0_15px_5px_rgba(0,255,0,0.5)]">
              <h2 className="text-3xl font-semibold text-pros-green text-center">Buy Tokens</h2>
              <div className="mt-4">
                <label className="block text-xl font-medium text-white-700">Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 h-12 focus:border-indigo-500 sm:text-xl text-2xl"
                />
                <button
                  onClick={handleMaxAmount}
                  className="mt-2 px-4 py-2 bg-pros-green text-black rounded-md text-xl"
                >
                  Max Amount
                </button>
              </div>
              <button
                onClick={handleBuy}
                className="mt-4 px-4 py-2 bg-pros-green text-black rounded-md text-xl"
              >
                Buy Tokens
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
