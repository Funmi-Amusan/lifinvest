import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchTickersByKeyword } from '../../store/slices/stockSlice';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { stocks } from '../../utils/data';

interface StockOption {
  '1. symbol': string;
  '2. name': string;
}

const SearchInput = ({ onSelectStock }: { onSelectStock: (symbol: string) => void }) => {
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
        width: 300,
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
      options={stocks}
      loading={loading}
      inputValue={keyword}
      onInputChange={(event, value) => {
        setKeyword(value);
      }}
      onChange={(event, value) => {
        if (value) {
          onSelectStock(value['1. symbol']);
        }
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
        >
          <div>
          <strong>{option['1. symbol']}</strong> - {option['2. name']}
          </div>
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