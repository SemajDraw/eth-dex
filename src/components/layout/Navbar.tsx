import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Text,
} from '@chakra-ui/react';
import { useWeb3Context } from '../../contexts/Web3Context';
import { Props } from '../../interfaces/component';
import { generateIdenticon } from '../../utils/generateIdenticon';

const NavLink = ({ children }: Props) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
    }}
    href={'/'}
  >
    {children}
  </Link>
);

export const Navbar = () => {
  const {
    account: { address },
    connectWallet,
  } = useWeb3Context();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-5, -1)}`;
  };

  return (
    <Box position={'fixed'} width={'100%'} bg={'transparent'} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <NavLink>
            <Text
              color={'purple.300'}
              as={'i'}
              fontSize={'2xl'}
              fontWeight={700}
            >
              EthDex
            </Text>
          </NavLink>
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            {address ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={`data:image/png;base64,${generateIdenticon(
                      address,
                      32
                    )}`}
                  />
                </MenuButton>
                <MenuList maxWidth={'200px'} alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={`data:image/png;base64,${generateIdenticon(
                        address,
                        32
                      )}`}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text>{truncateAddress(address)}</Text>
                  </Center>
                </MenuList>
              </Menu>
            ) : (
              <Button
                mt={2}
                bg={address ? 'purple.300' : 'purple.200'}
                _hover={{ bg: address ? 'purple.200' : 'purple.100' }}
                color={'white'}
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
