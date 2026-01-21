declare module "react-select-country-list" {
  interface CountryOption {
    value: string; // code pays ex: "FR"
    label: string; // nom pays ex: "France"
  }

  function countryList(): {
    getData: () => CountryOption[];
    getValue: (label: string) => string;
    getLabel: (value: string) => string;
  };

  export default countryList;
}
