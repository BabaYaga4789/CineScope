import { HStack, Box, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const [newKeyword, setNewKeyword] = useState("");
  return (
    <Box
      px={4}
      w="70%"
      as="section"
      marginLeft={5}
      marginRight={5}
    >
      {/* Reference: https://chakra-ui.com/docs/components/stack */}
      <HStack>
        <Input
          size="lg"
          variant="outline"
          placeholder="Search"
          onChange={(event) => {
            setNewKeyword(event.target.value);
          }}
        />
        <Button
          size="lg"
          colorScheme={"yellow"}
          variant={"solid"}
          onClick={() =>
            navigate("/search", { state: { keyword: newKeyword, option: "search" } })
          }
        >
          Search
        </Button>
      </HStack>
    </Box>
  );
};

export default SearchBar;
