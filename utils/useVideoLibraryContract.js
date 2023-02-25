import { useContract, useSigner } from "wagmi";
import ensRegistryABI from "contracts/ensRegistryABI.json";

const useVideoLibraryContract = () => {

    try {
        const { data: signer, isError, isLoading } = useSigner()
        const videoLibraryContract = useContract({
            address: '0xF5E6947F7b5f72bB3b779b4EF137555c32d956E1',
            abi: ensRegistryABI,
            signerOrProvider: signer,
          })
        return videoLibraryContract;  
    }
    catch (error) {
        console.log(error);
        return
    }
}
export default useVideoLibraryContract;