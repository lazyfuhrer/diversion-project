import { useCreateAsset } from "@livepeer/react"
import { useState } from "react"

export default function UploadNew() {
    const [video, setVideo] = useState(undefined)
    const {
      mutate: createAsset,
      data: assets,
      status,
      progress,
      error
    } = useCreateAsset(
      // we use a `const` assertion here to provide better Typescript types
      // for the returned data
      video
        ? {
            sources: [
              {
                name: video.name,
                file: video,
                storage: {
                  ipfs: true,
                  metadata: {
                    name: "interesting video",
                    description: "a great description of the video"
                  }
                }
              }
            ]
          }
        : null
    )
  
    return (
      <div>
        <input
          type="file"
          multiple={false}
          accept="video/*"
          onChange={e => {
            if (e.target.files) {
              setVideo(e.target.files[0])
            }
          }}
        />
        <button
          disabled={status === "loading" || !createAsset}
          onClick={() => {
            createAsset?.()
          }}
        >
          Create Asset
        </button>
        {assets?.map(asset => (
          <div key={asset.id}>
            <div>
              <div>Asset Name: {asset?.name}</div>
              <div>Playback URL: {asset?.playbackUrl}</div>
              <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? "None"}</div>
            </div>
          </div>
        ))}
  
        {error && <div>{error.message}</div>}
      </div>
    )
  }  