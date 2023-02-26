import { useEffect, useState } from 'react';
import {
  Flex,
  Input,
  Button,
  useColorModeValue,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  CircularProgress,
} from '@chakra-ui/react';
import useVideoLibraryContract from 'utils/useVideoLibraryContract';
import { AiOutlineUpload } from 'react-icons/ai';
import { useAsset, useCreateAsset, useUpdateAsset } from '@livepeer/react';
import { useAccount } from 'wagmi';
import { useIsMounted } from 'utils/useIsMounted';


export default function Home() {
  const mounted = useIsMounted();
  const [assetId, setAssetId] = useState(null);
  const videoLibraryContract = useVideoLibraryContract();
  const [video, setVideo] = useState(null);
  const { address } = useAccount();
  console.log(address);
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video ? { sources: [{ name: video.name, file: video }], } : null,
  );

  const { data: asset } = useAsset({
    assetId,
    refetchInterval: 10000,
  });

  const {
    mutate: updateAsset,
    status: stat,
    error: err,
  } = useUpdateAsset({
    assetId,
    storage: { ipfs: true },
  });

  useEffect(() => {
  }, [assetId]);

  const getAssetID = async () => {
    setAssetId(assets?.[0]?.id);
  }

  const creator = address;

  const saveVideo = async (e) => {
  
    while (!asset?.storage?.ipfs?.cid) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(asset?.name);
    console.log(asset?.id);
    console.log(asset?.storage?.ipfs?.cid);
    console.log(asset?.playbackId);
  
    const title = asset?.name;
    const playbackID = asset?.playbackId;
    const assetID = asset?.id;
    const ipfsHash = asset?.storage?.ipfs?.cid;
  
    const tx = await videoLibraryContract.addVideo(title, playbackID, assetID, ipfsHash, creator);
    alert(`Transaction hash: ${tx.hash}`);
  }

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Flex justifyContent="center" alignItems="center" mb="4">
            <Icon as={AiOutlineUpload} boxSize="12" />
          </Flex>

          <Text fontWeight="bold" textAlign="center" mb="4">
            Upload Video
          </Text>

          {video ? (
            <Flex justifyContent="space-between" alignItems="center" mb="4">
              <Text>{video.name}</Text>
              <Button size="sm" onClick={() => setVideo(null)}>
                Remove
              </Button>
            </Flex>
          ) : (
            <InputGroup mb="4">
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={AiOutlineUpload} />}
              />
              <Input
                type="file"
                multiple={false}
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setVideo(e.target.files[0]);
                  }
                }}
              />
            </InputGroup>
          )}

          <Button
            colorScheme="blue"
            disabled={!video || status === 'loading' || !createAsset}
            onClick={() => {
              createAsset?.();
            }}
          >
            {status === 'loading' ? (
              <CircularProgress size="24px" color="blue.500" />
            ) : (
              'Create Asset'
            )}
          </Button>

          {assets && (
            <Button colorScheme="teal" onClick={getAssetID}>
              Asset ID
            </Button>
          )}
          
          <Button
            disabled={stat === 'loading'}
            onClick={() => {
              updateAsset?.();
            }}
          >
            Upload to IPFS
          </Button>

          {asset && (
            <Button colorScheme="teal" onClick={saveVideo}>
              Upload 🚀
            </Button>
          )}

        </Stack>
      </Flex>
    </>
  );
}
