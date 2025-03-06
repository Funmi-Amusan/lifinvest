import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchTickersByKeyword } from '../../store/slices/stockSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { Ticker } from '../../store/slices/types';
import { Typography } from '@mui/material';

const SearchInput = ({ onSelectStock }: { onSelectStock: (symbol: Ticker) => void }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<Ticker[]>([]);
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
        if (response.payload && Array.isArray(response.payload)) {
          setOptions(response.payload);
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
      sx={{ 
        width: 500,
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          height: '40px'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px'
        },
        '& .MuiInputBase-input': {
          padding: '8px 14px'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'inherit',
          borderWidth: '1px',
          boxShadow: 'none'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'inherit'
        }
      }}
      options={options}
      loading={loading}
      inputValue={keyword}
      getOptionLabel={(option) => `${option['1. symbol']} - ${option['2. name']}`}
      onInputChange={(event, value) => {
        setKeyword(value);
      }}
      onChange={(event, value) => {
        if (value) {
          console.log(value);
          onSelectStock(value);
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
        >
           <Typography
      variant="body1"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        rowGap: '8px',
        alignItems: 'center',
        padding: '8px 16px',
        width: '100%'
      }}
    >
      {option['1. symbol']}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: '#666',
        fontSize: '0.85rem'
      }}
    >
      {option['2. name']}
    </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Stock"
        />
      )}
      noOptionsText="No stocks found"
    />
  );
};
export default SearchInput;