import React, { Component, Fragment } from 'react';
import { Flex, Box, Text, ButtonOutline } from 'rebass';
import axios from 'axios';

const GATEWAY_URL = 'http://localhost:6001';
const simpleStyle = {
  height: '100px',
  width: '100px',
  border: '2px dotted #ccc',
  display: 'block',
  margin: '0 auto',
};

const videoStyle = {
  display: 'block',
  margin: '0 auto',
};
export default class Videos extends Component {
  state = {
    videos: [],
    error: null,
    playingVideo: null,
  };

  componentDidMount() {
    return axios
      .get([GATEWAY_URL, 'videos'].join('/'))
      .then(response => {
        this.setState({ videos: response.data.lines });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  selectVideo = url => {
    this.setState({
      playingVideo: url,
    });
  };

  render() {
    const { videos, playingVideo } = this.state;
    if (videos.length < 1) {
      return <Box>No Videos found.</Box>;
    }

    return (
      <Flex flexWrap="wrap" mx={-2} alignItems="center">
        {playingVideo && (
          <Box width={1} px={4}>
            <video style={videoStyle} src={playingVideo} preload="auto" controls />
          </Box>
        )}
        {videos.map(video => (
          <Fragment>
            <Box width={1 / 4} px={2}>
              <div style={{ margin: '0 auto' }}>
                <img style={simpleStyle} src={video.thumb_url} alt="thumbnail" />
              </div>
            </Box>
            <Box width={3 / 4} px={2}>
              <Text h={4} color="white" bg="skyblue">
                <ButtonOutline
                  children="Click to watch!"
                  onClick={() => this.selectVideo(video.video_url)}
                />
              </Text>
              <Text p={1} color="white" bg="skyblue">
                {`Duration: ${video.duration / 1000}s`}
              </Text>
            </Box>
          </Fragment>
        ))}
      </Flex>
    );
  }
}
