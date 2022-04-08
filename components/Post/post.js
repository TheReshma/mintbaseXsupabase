import {
    Box,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    Input,
    IconButton,
    Heading,
    Stack,
} from "@chakra-ui/react";
import { GiCrownedHeart } from "react-icons/gi";
import { MdOutlineThumbDown, MdOutlineThumbUp, MdOutlineThumbUpAlt, MdOutlineThumbUpOffAlt } from "react-icons/md"
import { useState, useEffect } from "react";
import useCustomToast from "../../hooks/useCustomToast";
import TimeAgo from "timeago-react";
import { supabaseNftData } from "../../utils/supabaseGraph";


export default function Post({ nft }) {


    const postBg = useColorModeValue("#edf2f7", "#171923");
    const styles = {
        // fontFamily: "poppings",
        backgroundColor: postBg,
        // maxHeight: 430,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        },
        // ! prevent too long to read contents from spanning large heights
        // instead turn to scrollable content container
        content: {
            margin: "0 auto",
            overflowY: "auto",
            maxH: 400,
            overflowX: "hidden",

        },
        footer: {
            // height: 64,
            display: "flex",
            alignItems: "center",
        },
    };

    // Supabase data

    const { data, loading } = supabaseNftData(nft.thing.id)

    console.log(data)
    return (
        <Box style={styles}>
            <Heading
            // style={styles.header}
            >
                <Box
                    className="flex"
                >
                    <Avatar
                        className=" bg-slate-300 hover:cursor-pointer hover:border-slate-300 hover:border-2"
                        bg={postBg}
                        name={nft.minter}
                        src={nft.thing.store.iconBase64}
                        size="sm"
                    // onClick={console.log("Show all NFTs from this store")}
                    />
                    <Button
                        className="mr-auto ml-3"
                        // onClick={console.log("Show all NFTs from this minter!")}
                        my={2}
                    >{nft.minter}
                    </Button>
                    <Button
                        className="ml-3 mr-1"
                    // onClick={console.log("Filter for this media type!")}
                    >
                        {nft.thing.metadata?.media_type}
                    </Button>
                </Box>
                <Text
                    className="text-base tracking-wider uppercase font-mono font-extrabold"
                    my={2}
                >{nft.thing.metadata?.title}</Text>
                <TimeAgo
                    className={`text-[11px] order-last pr-1 opacity-60`}
                    datetime={nft.createdAt}
                />
            </Heading>
            <Box mb={1} style={styles.content} className="flex">
                <ChakraImage
                // onClick="The image should pop up and fill the whole screen"
                    maxH={200}
                    rounded="lg"
                    maxWidth={["100%", "400px", "225px"]}
                    margin="0 auto"
                    src={nft.thing.metadata?.media}
                    alt={"contentNftmedia" + nft.thing.id}
                    objectFit="contain"
                />
                <Box p={2} style={styles.content} className="overflow-hidden">
                    {nft.thing.metadata?.description}
                </Box>
            </Box>
            <Divider />
            <Box p={2} style={styles.footer}>
                <IconButton
                    className="mr-3"
                    icon={<MdOutlineThumbUp />}
                    isRound
                // onClick={console.log("Add to favorites")}
                >
                </IconButton>
                <Text> 1 </Text>
                <IconButton
                    className="mr-3 ml-3"
                    icon={<MdOutlineThumbDown />}
                    isRound
                // onClick={console.log("Dislike NFT")}
                >
                </IconButton>
                <Text> 3 </Text>
                <IconButton
                    className="ml-auto h-6 mr-3"
                    icon={<GiCrownedHeart className="fill-red-500" />}
                    isRound
                // onClick={console.log("Like NFT")}
                >
                </IconButton>
                <Text> 111 </Text>
            </Box>
            <Box
                className=" mr-1 flex"
            >
                <Input variant='filled' placeholder='Commnet' />
                <IconButton>Send!</IconButton>
            </Box>
            <Stack>
                <Text>Latest Comment</Text>
                <Text>More Comments</Text>
                <Text>Perhaps make an component for Comments.</Text>
                <Text>The comment Author and date also need to fit here.</Text>
                <Text>First Comment</Text>
            </Stack>

        </Box>
    );
}