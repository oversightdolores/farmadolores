import { Dimensions } from "react-native";
import {
  Box,
  Text,
  Avatar,
  Heading,
  Stack,
  HStack,
  Pressable,
  VStack,
} from "native-base";
import React from "react";

export default function TurnosCards(props) {
  return (
    <Stack p="2" space={0} content="center">
      <Box
        flexDirection="row"
        alignItems="center"
        bg="light.50"
        p="1.5"
        rounded="lg"
        shadow="8"
        maxH={Dimensions.get("window").height / 3}
        maxW={Dimensions.get("window").width - 20}
      >
        <Avatar size="lg" source={{ uri: props.image }} />
        <Stack p="4" content="center">
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.name}
            </Heading>
          </Stack>
          <Text fontWeight="400">{props.dir}</Text>
          <Text fontWeight="400">{props.tel}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center"></HStack>
          </HStack>
        </Stack>
      </Box>
    </Stack>
  );
}
