import { Box, Button } from '@chakra-ui/react'
import { Player } from '@livepeer/react'
import { useQuery } from 'urql';
import { ethers, utils } from 'ethers';
import useVideoLibraryContract from 'utils/useVideoLibraryContract';
import { useSigner } from 'wagmi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TodosQuery = `
  query {
    videos {
      id
      title
      playbackID
      assetID
      ipfsHash
    }
  }
`;

function Feed() {

  const { data: signer, isError, isLoading } = useSigner()
  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
  });
  const videoLibraryContract = useVideoLibraryContract();

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(data['videos']);

  const tipOwner = async () => {
    const sendToast = toast.loading("Please Sign Message ✍️");
    try{
      const videoAuthor = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
      const tip = '0.05';
      const tipAmount = ethers.utils.parseEther(tip);
      const tx = await videoLibraryContract.tipToOwner(videoAuthor, {
        value: tipAmount,
      });
      toast.update(sendToast, {
        render: `Sending ${tip} MATIC 💰`,
        type: "default",
        isLoading: true,
      });
      await tx.wait();
      toast.update(sendToast, {
        render: "Tip Sent 💜",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    }
    catch (err){
      toast.update(sendToast, {
        render: "Transaction Rejected ☹️",
        type: "error",
        isLoading:false,  
        autoClose:1000
      })
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        {data['videos'].map((item) => (
            <Box>
                <Box key={item.id} w={600} h={700} justifyContent='center'>
                    <Player
                        title={item.title}
                        playbackId={item.playbackID}
                        showPipButton
                        showTitle={true}
                        aspectRatio="9to16"
                        controls={{
                        autohide: 3000,
                        }}
                        theme={{
                        borderStyles: { containerBorderStyle: 'hidden' },
                        radii: { containerBorderRadius: '10px' },
                        }}
                    />
                </Box>
                <Button onClick={tipOwner} >Tip Me 🍭</Button>
            </Box>))}
    </>
  )
}

export default Feed;