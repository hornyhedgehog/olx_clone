import React, {useState} from 'react'

import {StlViewer} from 'react-stl-file-viewer'
import {Box, Button, Flex, Heading, Image} from '@chakra-ui/react'

import "./ModelViewer.css";

function ModelViewer({src}) {
    const [volume, setVolume] = useState(0)

    return (
        <div id='bg'>
            <Flex flexGrow={1} padding={1}>
                <Box border='1px' borderColor='blue'>
                    <StlViewer
                        width={1075}
                        height={732}
                        url={src || 'elephant.stl'}
                        groundColor='rgb(255, 255, 255)'
                        objectColor='rgb(255,255,0)'
                        skyboxColor='rgb(255, 0, 255)'
                        // gridLineColor='rgb(0, 0, 0)'
                        lightColor='rgb(255, 255, 255)'
                        volume={setVolume}
                    />
                </Box>
            </Flex>
            <div id='volumeText'>
                {`Volume: ${volume.toFixed(1)} cm^3`}
            </div>
        </div>
    )
}

export default ModelViewer;
