
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import axiosService from "utils/axiosService";
import * as Yup from "yup";
import { emailPattern } from "utils/helperFunctions";

function SignIn() {

  const initialValues = {
    email: '',
    password: ''
  }

  const navigate = useNavigate();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailPattern, "Enter a valid email address").required('Email is Required'),
    password: Yup.string()
      .required('Password is Required'),
  });

  const onSubmitAction = async (values, { resetForm }) => {
    const payload = {
      ...values
    }
    try {
      const res = await axiosService.apis("POST", `/api/auth/login`, payload);
      if (res?.status) {
        toast.success('User Login Successfully...');
        resetForm();
        localStorage.setItem('accessToken', JSON.stringify(res?.token));
        localStorage.setItem('accessToken', JSON.stringify(res?.user));
        navigate('/admin/default');
      }
      else {
        toast.error(res?.message || 'Some thing wrong, Please try again.')
      }
    } catch (err) {
      return { status: false, message: "Some thing wrong, Please try again." };
    }
  }

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitAction}
          >
            {({ values, handleBlur, handleChange }) => (
              <Form>
                <FormControl>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Email<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    as="input"
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='mail@simmmple.com'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="email" component="div" />
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Password<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input
                      as="input"
                      fontSize='sm'
                      placeholder='Min. 8 characters'
                      mb='24px'
                      size='lg'
                      type={show ? "text" : "password"}
                      variant='auth'
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                      <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="password" component="div" />
                  <Flex justifyContent='space-between' align='center' mb='24px'>
                    <FormControl display='flex' alignItems='center'>
                      <Checkbox
                        id='remember-login'
                        colorScheme='brandScheme'
                        me='10px'
                      />
                      <FormLabel
                        htmlFor='remember-login'
                        mb='0'
                        fontWeight='normal'
                        color={textColor}
                        fontSize='sm'>
                        Keep me logged in
                      </FormLabel>
                    </FormControl>
                    <NavLink to='/auth/forgot-password'>
                      <Text
                        color={textColorBrand}
                        fontSize='sm'
                        w='124px'
                        fontWeight='500'>
                        Forgot password?
                      </Text>
                    </NavLink>
                  </Flex>
                  <Button
                    type="submit"
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'>
                    Sign In
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>

          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
