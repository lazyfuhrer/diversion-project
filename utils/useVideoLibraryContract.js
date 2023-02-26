import { useContract, useSigner } from "wagmi";
import ensRegistryABI from "contracts/ensRegistryABI.json";

const useVideoLibraryContract = () => {

    try {
        const { data: signer, isError, isLoading } = useSigner()
        const videoLibraryContract = useContract({
            address: '0x5d41E3e3DbD3c4d5ee029e94ef49740ECA5240C7',
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