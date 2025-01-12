import { useState } from "react";
import { Box, Button, Heading, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../../store/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore(); // Assuming you have an updateProduct function in your store
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error(message || "Failed to delete the product");
    } else {
      toast.success(message || "Product deleted successfully");
    }
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (!success) {
      toast.error(message || "Failed to update the product");
    } else {
      toast.success(message || "Product updated successfully");
      setIsEditing(false); // Close the edit form after successful update
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />

      <Box p={4}>
        {isEditing ? (
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Product Name"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
            />
            <Input
              placeholder="Price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              value={updatedProduct.image}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
            />
            <HStack spacing={2}>
              <Button colorScheme="blue" onClick={handleUpdateProduct}>
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        ) : (
          <>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>

            <Text fontWeight="bold" fontSize="xl" mb={4}>
              ${product.price}
            </Text>

            <HStack spacing={2}>
              <Button colorScheme="red" onClick={() => handleDeleteProduct(product._id)}>
                <MdDelete />
              </Button>
              <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
                <FaEdit />
              </Button>
            </HStack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
