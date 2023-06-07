import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { CartIcon, UserIcon } from "../assets";

const ConnectWallet = () => {
  const {
    enableWeb3,
    isWeb3Enabled,
    account,
    deactivateWeb3,
    Moralis,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, []);

  useEffect(() => {
    // Moralis
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, []);
  return (
    <div>
      {account ? (
        // <Link to="/profile">
        <div className=" flex justify-center items-center font-semibold text-[#666666] gap-2 bg-white p-[6px]">
          <div className="flex items-center gap-1 cursor-pointer">
            <UserIcon className="h-8 w-8 " />
            <p>
              {account.slice(0, 7)}...
              {account.slice(account.length - 4)}
            </p>
          </div>
          <div className="h-9 w-[2px] bg-[#D9D9D9] mx-3"></div>
          <div className="flex items-center gap-1 cursor-pointer">
            <CartIcon className="h-7 w-7" />
            <p>Cart</p>
          </div>
        </div>
      ) : (
        // </Link>
        <button
          // className="connect bg-[#2CAE8F] w-full py-2 px-4 font-bold text-white rounded-md hover:bg-[#219f82]"
          className=" text-[#424242] border-2 bg-white border-[#424242] py-2 px-5 w-[100%] rounded-[5px] hover:border-primaryColor hover:text-primaryColor"
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
