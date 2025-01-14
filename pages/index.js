import Header from '../components/Header'
import Head from '../components/Head'
import Feed from '../components/Feed'
import Favos from '../components/Favos'
import { Text, Box, Center, Image, Heading, HStack, Button, useColorModeValue, Show, Hide, Link } from '@chakra-ui/react'
import { useUser } from '../hooks/authUser'
import { graphqlSync } from 'graphql'
import { useState, useEffect, useReducer } from 'react'
import { createApolloClient } from '../utils/initApolloMintbase'
import { supabase } from '../utils/initSupabase'


const OpenTab = ({openFeed, mintbaseNetwork, favo}) => {

  return (
    <Box>
      {openFeed 
      ? <Feed mintbaseNetwork={mintbaseNetwork} favo={favo} /> 
      : <Favos mintbaseNetwork={mintbaseNetwork} favo={favo} />}
    </Box>
  )
} 


const Index = () => {

  const {user} = useUser();
  const bg = useColorModeValue("white", "#030406");

  function networkReducer(mintbaseNetwork, action) {
    if (action === "mainnet") {
      const mClient = createApolloClient(action);

      return { client: mClient, network: action };
    } else if (action === 'testnet') {
      const mClient = createApolloClient(action);

      return { client: mClient, network: action };
    } else { throw new Error(); }
  }

  const [mintbaseNetwork, setMintbaseNetwork] = useReducer(networkReducer, { client: createApolloClient("testnet"), network: "testnet" });
  const [openFeed, setOpenFeed] = useState(true)
  const favo = useState([])

  // Get Favorite Id list for user.
  useEffect(() => {
      async function getFavos() {
          const { error, data } = await supabase.from('Favorite').select('id')
                                                  .eq('user_id', user.id)
                                                  .eq('mainnet', (mintbaseNetwork.network === 'mainnet'))
          if (data?.length > 0) {
              favo[1](data.map((element) => { return element.id}))
          }
      }
      getFavos();
      console.log("Favo: ",favo)
  }, [user.id, mintbaseNetwork])


  return (
    <Box>
      <Head />
      <Header mintbaseNetwork={mintbaseNetwork} setMintbaseNetwork={setMintbaseNetwork} openFeed={openFeed} setOpenFeed={setOpenFeed} />
      <main>
        {user
        // {true
          ? <OpenTab openFeed={openFeed} mintbaseNetwork={mintbaseNetwork} favo={favo} />
          :
          <HStack bg={bg}>
            <Hide below='md'>
              <Box>
                <Image boxSize='95%' height={"100vh"} objectFit='cover' src='/images/hero-image.jpg' />
              </Box>
            </Hide>
            <Box p={10} m={10}>
              <Heading textAlign={"center"} p={2} as='h1' size={"4xl"} > All <br />your NFTs <br />in one place </Heading>
              <Text align={"center"} m={4} >Dopest NFTs from Mintbase. Collect, Like & Share now!</Text>
              <Center>
                <Link href="/auth">
                  <Button p={5} size={"lg"} color={"blue.100"} bg={'gray.700'}> Login </Button>
                </Link>
              </Center>
            </Box>
          </HStack>
        }
      </main>
    </Box>
  )
}

export default Index
