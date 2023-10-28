import { nftcontract } from "./config";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import NFTABI from './nftabi.json';



export async function ethConnect() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const nftctr = new ethers.Contract(nftcontract, NFTABI, signer);
    //const userctr = new ethers.Contract(userdbaddress, USERABI, signer);
    //const tokenctr = new ethers.Contract(tokenaddress, TOKENABI, signer);
    const addressraw = signer.getAddress();
    const addressstr = (await addressraw).valueOf();
    return {addressstr, nftctr};
}

export async function checkNfts() {
    const walletdata = await ethConnect();
    const nftcont = walletdata.nftctr;
    const walletaddr = walletdata.addressstr;
    const checkbalance = Number((await nftcont.balanceOf(walletaddr)).valueOf());
    if (checkbalance > 0) {
        return checkbalance;
    }
    else {
        return 0;
    }
}



