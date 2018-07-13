import React, { Component } from 'react';
import { Flex, Box, Text } from 'rebass';
class App extends Component {
  render() {
    return (
      <Flex flexWrap="wrap" mx={-2}>
        <Box width={1 / 4} px={2}>
          <Text p={1} color="white" bg="skyblue">
            Aria
          </Text>
        </Box>
        <Box width={3 / 4} px={2}>
          <Text p={1} color="white" bg="skyblue">
            Rest
          </Text>
        </Box>
      </Flex>
    );
  }
}

export default App;
