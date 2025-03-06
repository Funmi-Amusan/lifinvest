import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchTickersByKeyword } from '../../store/slices/stockSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

interface StockOption {
  '1. symbol': string;
  '2. name': string;
}

const SearchInput = ({ onSelectStock }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<StockOption[]>([]);
  const dispatch = useDispatch();

  const debouncedSearch = useCallback((searchKeyword: string) => {
    const search = async () => {
      if (searchKeyword.length < 2) {
        setOptions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await dispatch(fetchTickersByKeyword(searchKeyword) as any);
        console.log(response.payload);
        if (response.payload && Array.isArray(response.payload)) {
          setOptions(response.payload);
          console.log(response.payload);
        }
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setLoading(false);
      } 
    };

    debounce(search, 300)();
  }, [dispatch]);

  useEffect(() => {
    debouncedSearch(keyword);
  }, [keyword, debouncedSearch]);

  return (
    <Autocomplete
      id="stock-search-select"
      sx={{ width: 300 }}
      options={options}
      loading={loading}
      autoHighlight
      inputValue={keyword}
      onInputChange={(event, value) => {
        setKeyword(value);
      }}
      onChange={(event, value) => {
        console.log("selected", value);
        if (value) {
          onSelectStock(value['1. symbol']);
        }
      }}
      getOptionLabel={(option) => `${option['1. symbol']} (${option['2. name']})`}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <strong>{option['1. symbol']}</strong> - {option['2. name']}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search stock"
          placeholder="Search Stock"
        />
      )}
      noOptionsText="No stocks found"
    />
  );
};
export default SearchInput;