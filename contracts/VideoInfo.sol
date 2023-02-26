// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract VideoInfo {
    
    event VideoAdded(uint256 indexed id, string title, string playbackID, string assetID, string ipfsHash, string creator);
    
    struct Video {
        uint256 id;
        string title;
        string playbackID;
        string assetID;
        string ipfsHash;
        string creator;
    }
    
    Video[] public videos;
    mapping (uint256 => uint256) public videoIndex;
    
    function addVideo(string memory _title, string memory _playbackID, string memory _assetID, string memory _ipfsHash, string memory _creator) public {
        uint256 id = videos.length;
        Video memory newVideo = Video(id, _title, _playbackID, _assetID, _ipfsHash, _creator);
        videos.push(newVideo);
        videoIndex[id] = videos.length - 1;
        emit VideoAdded(id, _title, _playbackID, _assetID, _ipfsHash, _creator);
    }
    
    function getVideoCount() public view returns (uint256) {
        return videos.length;
    }
    
    function getVideoById(uint256 _id) public view returns (uint256, string memory, string memory, string memory, string memory, string memory) {
        require(_id < videos.length, "Invalid video ID");
        uint256 index = videoIndex[_id];
        Video memory v = videos[index];
        return (v.id, v.title, v.playbackID, v.assetID, v.ipfsHash, v.creator);
    }

    function tipCreator(address payable videoCreator) external payable {
        require(msg.value > 0, 'Send more than 0.001 ERC20 token');
        videoCreator.transfer(msg.value);
    }
    
}