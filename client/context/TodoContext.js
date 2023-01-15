
import React,{ useState, useEffect } from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { providers, Contract } from "ethers";
import { useRef} from "react";

import { contractAddress, contractABI} from "./constants"

const fetchContract = (signerOrProvider) => new ethers.Contract(contractAddress, contractABI, signerOrProvider)

export const TodoContext = React.createContext();

export const TodoProvider = ({children}) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([])
  const web3ModalRef = useRef();


  const getProviderOrSigner = async (needSigner = false) => {
    const connection = await web3ModalRef.current.connect();
    const provider = new providers.Web3Provider(connection);

    const { chainId } = await provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
  };

 
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      setIsUserLoggedIn(true)

    } catch (err) {
      console.error(err);
    }
  };

  
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
    getMyTasks();

  }, [walletConnected])


    // Add tasks from front-end onto the blockchain
    const addTask = async (e) => {
        // To avoid refresh, use e.preventDefault()
        e.preventDefault()

        let task = {
            taskText: input,
            isDeleted: false
        }

        try {
            const signer = await getProviderOrSigner(true);
            const TodoContract = fetchContract(signer);
            const addTask = await TodoContract.addTask(task.taskText, task.isDeleted)
            setTasks([...tasks, task])
            console.log("Task is added successfully")
            setLoading(true);
            await addTask.wait();
            setLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(error) 
        }
        setInput("");
      }


    // Just gets all the tasks from the contract
    const getMyTasks = async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const TodoContract = fetchContract(signer);
            const getMyTask = await TodoContract.getMyTasks()
            console.log(getMyTasks)
            setTasks(getMyTask)
            console.log("All your tasks are listed successfully")
            setLoading(true);
            await getMyTask.wait();
            setLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(error) 
        }
      }
  
     // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
    const deleteTask = key => async () => {
        try {
            const signer = await getProviderOrSigner(true);
            const TodoContract = fetchContract(signer);
            const deleteTask = await TodoContract.deleteTask(key, true)
            console.log("Successfully deleted task")

            let allTasks = await TodoContract.getMyTasks()
            setTasks(allTasks);
            console.log("All your tasks are relisted successfully")

            setLoading(true);
            await deleteTask.wait();
            setLoading(false);
            window.location.reload();

        } catch (error) {
            console.log(error) 
        }
      }


    return(
        <TodoContext.Provider value={{connectWallet, isUserLoggedIn, addTask, input, setInput, getMyTasks, tasks, deleteTask}} >
            {children}
        </TodoContext.Provider>
    )
}
