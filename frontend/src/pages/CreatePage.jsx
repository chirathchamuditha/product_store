import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { useProductStore } from '../store/product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const { createProduct } = useProductStore();
    
    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (!success) {
            toast.error(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.success(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setNewProduct({ name: "", price: "", image: "" });
    }

    return (
        <Container maxW={"1140px"} maxH={"400px"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"4xl"} textAlign={"center"} mb={5} mt={8}>
                    Create New Product
                </Heading>

                <Box 
                    w={"full"} bg={"gray.600"}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            _placeholder={{ color: "gray.400" }} 
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            type='number'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            _placeholder={{ color: "gray.400" }} 
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            _placeholder={{ color: "gray.400" }} 
                        />

                        <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
                            <FaPlus /> Add Product
                        </Button>
                    </VStack>
                </Box>

            </VStack>
            <ToastContainer />
        </Container>
    );
}

export default CreatePage;
