import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

const ConnectWalletButton = () => {
  const{connectWallet} = useContext(TodoContext)

  return (
    <button
         className='h-[5rem] text-2xl font-bold py-3 px-12 bg-[#1E90ff] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out mx-auto my-15'
         onClick={connectWallet}
     >
         Connect Wallet
    </button>
  )
}
export default ConnectWalletButton

