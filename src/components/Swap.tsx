import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Heading,
  Container,
  Input,
  Button,
  SimpleGrid,
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps, FormikValues } from 'formik';
import { useWeb3Context } from '../contexts/Web3Context';

export const Swap = () => {
  const {
    account: { address },
    connectWallet,
  } = useWeb3Context();

  const swapFieldValues = (values: FormikValues, setFieldValue: Function) => {
    const { from, to } = values;
    setFieldValue('from', to);
    setFieldValue('to', from);
  };

  return (
    <Flex
      alignItems={'center'}
      h={'100%'}
      bgGradient={['linear(to-b, orange.100, purple.300)']}
    >
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={1}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        centerContent
      >
        <Flex
          boxShadow={'lg'}
          bg={'gray.50'}
          rounded={'xl'}
          p={2}
          pt={4}
          maxWidth={'480px'}
          w={'100%'}
        >
          <VStack align={'left'} spacing={2} w={'100%'}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={'md'}
              style={{ fontWeight: 600 }}
              p={2}
            >
              Swap
            </Heading>
            <Formik
              initialValues={{ from: '', to: '' }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Field name={'from'} type={'text'}>
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        mb={0.5}
                        isRequired
                        isInvalid={
                          Boolean(form?.errors?.from) &&
                          Boolean(form?.touched?.from)
                        }
                      >
                        <Input
                          bg={'#edf2f7'}
                          {...field}
                          id="from"
                          placeholder="0.0"
                          pt={8}
                          pb={9}
                          fontSize={'2xl'}
                        />
                        <FormErrorMessage>
                          {form?.errors?.from?.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex
                    width={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Button
                      position={'absolute'}
                      size={'md'}
                      color={'grey.400'}
                      p={0}
                      m={0}
                      zIndex={1000}
                      border={'2px'}
                      borderColor={'#f7fafc'}
                      borderRadius={12}
                      h={'32px'}
                      w={'32px'}
                      onClick={() =>
                        swapFieldValues(props.values, props.setFieldValue)
                      }
                    >
                      <ArrowDownIcon />
                    </Button>
                  </Flex>
                  <Field name={'to'} type={'text'}>
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        mt={0.5}
                        isRequired
                        isInvalid={
                          Boolean(form?.errors?.to) &&
                          Boolean(form?.touched?.to)
                        }
                      >
                        <Input
                          {...field}
                          bg={'#edf2f7'}
                          id="to"
                          placeholder="0.0"
                          pt={8}
                          pb={9}
                          fontSize={'2xl'}
                        />
                        <FormErrorMessage>
                          {form?.errors?.to?.toString()}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {address ? (
                    <Button
                      mt={2}
                      colorScheme="purple"
                      isLoading={props.isSubmitting}
                      type="submit"
                      width={'100%'}
                    >
                      Swap
                    </Button>
                  ) : (
                    <Button
                      mt={2}
                      bg="purple.200"
                      color={'white'}
                      _hover={{ bg: 'purple.100' }}
                      isLoading={props.isSubmitting}
                      width={'100%'}
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};
