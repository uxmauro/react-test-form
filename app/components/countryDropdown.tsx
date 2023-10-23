import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import axios from 'axios';

interface Country {
  cca2: string;
  name: {
    common: string;
  };
}

interface CountryDropdownProps {
  selectedCountry: string;
  onSelectCountry: (selectedCountry: string) => void;
}

type CustomStyles = StylesConfig<{ value: string; label: string; color: string }, false>

const customStyles:CustomStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Add a border to the control
    borderRadius: 0, // Set border radius to 0
    boxShadow: 'none', // Remove the focus outline
    "&:hover": {
      border: 'none', // Ensure focus border is removed
    },
  })
  ,
  indicatorSeparator: () => ({
    display: 'none', // Hide the indicator separator
  }),
  option: (provided, state) => ({
    ...provided,
    border:  'none',
    backgroundColor: state.data.color, // Use the "color" property to set the background color
    color:  '#413C5F', // Change text color when selected
    fontWeight: state.isSelected ? '600' : 'normal',
    padding: '5px', // Adjust the padding as needed
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#C0BCDF', // Your desired text color
  }),

};

const CustomDropdownIndicator = () => {
  return (
    <div className=" mr-3">
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#817CA5"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.805856 2.28013C0.398103 1.87238 0.398048 1.21484 0.805691 0.807022C1.205.39899 1.87133 0.399052 2.27119 0.798913L7.99605 6.52378L13.7209 0.806856C14.1287 0.399047 14.7863 0.399047 15.1941 0.806856C15.602 1.21466 15.602 1.87232 15.1941 2.28013L8.59367 8.8806C8.26529 9.20898 7.73471 9.20898 7.40633 8.8806L0.805856 2.28013Z"
        />
      </svg>
    </div>
  );
};


function CountryDropdown({ onSelectCountry }: CountryDropdownProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');



  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    fetchCountries();
  }, []);

  const handleCountryChange = (selectedOption:any) => {
    const selectedValue = selectedOption.value;
    setSelectedCountry(selectedValue);
    onSelectCountry(selectedValue);
  };

  //Sort in Alphabetical Order
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  //Dropdown options
  const countryOptions = countries.map((country, index) => ({
    value: country.name.common,
    label: country.name.common,
    color: index % 2 === 0 ? '#F6F4FF' : '#white',
  })
  )

  return (
    <div>
      <Select
        options={countryOptions}
        onChange={handleCountryChange}
        styles={customStyles}
        value={countryOptions.find((option) => option.value === selectedCountry)}
        placeholder="Select Country"
        components={{ DropdownIndicator: CustomDropdownIndicator }}
      />
    </div>
  );
}

export default CountryDropdown;


