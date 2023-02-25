import { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
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
import { useCreateAsset } from '@livepeer/react';

export default function Form() {
  const videoLibraryContract = useVideoLibraryContract();

  const [formData, setFormData] = useState({
    title: '',
    playbackID: '',
    assetID: '',
    ipfsHash: '',
  });

  const [video, setVideo] = useState(null);
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video ? { sources: [{ name: video.name, file: video }] } : null,
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, playbackID, assetID, ipfsHash } = formData;
    const tx = await videoLibraryContract.addVideo(title, playbackID, assetID, ipfsHash);
    alert('Transaction hash:', tx.hash);
    //console.log(title, playbackID, assetID, ipfsHash);
    setFormData({
      title: '',
      playbackID: '',
      assetID: '',
      ipfsHash: '',
    });
  };

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}
          borderRadius="20px"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        >

          <Flex justifyContent="center" alignItems="center" mb="4">
            <Icon as={AiOutlineUpload} boxSize="12"
              width=" 27%"
              padding=" 10px"
              borderRadius=" 27px" />
            {/*             <Image src="https://i.postimg.cc/25DJLWfX/output-onlinegiftools.gif" width={100} height={100} alt="File Upload" /> */}

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
              <Input type="file" multiple={false} accept="video/*" onChange={(e) => {
                if (e.target.files) {
                  setVideo(e.target.files[0]);
                }
              }} />
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

          {assets?.map((asset) => (
            <div key={asset.id}>
              <div>
                <div>Title: {asset?.name}</div>
                <div>Playback ID: {asset?.playbackId}</div>
                <div>Asset ID: {asset?.id}</div>
                <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
              </div>
            </div>
          ))}

          {error && <div>{error.message}</div>}

        </Stack>
        {/* SEPERATION */}
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            p={8}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="title">
                  <Input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="playbackID">
                  <Input
                    type="text"
                    placeholder="Playback ID"
                    name="playbackID"
                    value={formData.playbackID}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="assetID">
                  <Input
                    type="text"
                    placeholder="Asset ID"
                    name="assetID"
                    value={formData.assetID}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl id="ipfshash">
                  <Input
                    type="text"
                    placeholder="IPFS CID"
                    name="ipfsHash"
                    value={formData.ipfsHash}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Upload 🚀
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>

      </Flex>

    </>
  );
}
