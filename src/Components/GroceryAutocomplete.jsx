import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";

const GroceryAutocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setOptions([]);
      setSearchResults(null);
    } else {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      const filteredUsers = allUsers.filter((user) =>
        user.displayName.toLowerCase().includes(lowercaseSearchTerm)
      );
      setOptions(filteredUsers);
    }
  }, [searchTerm, allUsers]);

  // choose value from autocopmplete
  const handleSelect = (event, value) => {
    if (value) setSearchResults([value]);
  };

  return (
    <div style={{ marginTop: 5, marginRight: 10 }}>
      <Autocomplete
        options={options}
        inputValue={searchTerm}
        getOptionLabel={(option) => option.name || ""} //shows how to display name
        style={{ width: 300, marginLeft: 10, height: 40 }}
        loading={loading} //loading names so far
        onInputChange={(event, newInputValue) => {
          //if name chosen
          setSearchTerm(newInputValue);
        }}
        onChange={handleSelect} //if name chose
        renderInput={(
          params //render text field with autocomplete
        ) => (
          <TextField
            {...params}
            label="Grocery Item"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
};

export default GroceryAutocomplete;
