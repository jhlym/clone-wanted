import React from "react";

// components
import { Container, Grid, Button, Icon } from "semantic-ui-react";
import FilterModal from "./Modal/FilterModal";
// api
import { _getFilters, _getJobs } from "../../api/explorer";
// utils
import { decodeUnicode } from "../../utils";

export const FilterContext = React.createContext(null);

const Explorer = () => {
  const [filterModalOpen, setFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState(null);
  const [selectedFilters, setSelectedFilters] = React.useState(null);

  // componentDidMount
  React.useEffect(() => {
    // call restful api for getting filter options
    _getFilters().then(res => {
      const tmpFilters = convertDropdownFormat(res.data);
      setFilters(tmpFilters);
      setSelectedFilters({
        job_sort: tmpFilters.job_sort[0],
        countries: tmpFilters.countries[0],
        years: tmpFilters.years[0],
        locations: tmpFilters.countries[0].locations[0]
      });
    });
  }, []);

  // 다음 형식으로 데이터 변환(semantic ui dropdown option format)
  // {key: [{key:0, value: "job.latest_order", text: "최신순"}]}
  const convertDropdownFormat = data => {
    let newObj = {};
    // 다음 과 같은 형식으로 데이터가 들어옴(key: array)
    // {job_sort: [], employee_count: [], countries: [], years: []}
    Object.keys(data).forEach(key => {
      const newValue = data[key].map(e => ({
        ...e,
        objkey: key,
        value: e.key,
        text: decodeUnicode(e.display)
      }));
      newObj[key] = newValue;
    });
    return newObj;
  };

  const toggleFilterModal = () => {
    setFilterModal(!filterModalOpen);
  };

  return (
    <Container>
      {/* Filter */}
      <Grid style={{ margin: "10px 0" }}>
        <Grid.Column floated="left" width={10}>
          {selectedFilters && (
            <>
              <Button basic onClick={toggleFilterModal}>
                {selectedFilters["job_sort"].text}
              </Button>
              <Button basic onClick={toggleFilterModal}>
                {`국가 ${selectedFilters["countries"].text}`}
              </Button>
              {/* <Button basic onClick={toggleFilterModal}>
                {`지역 ${selectedFilters["locations"][0].display}`}
              </Button> */}
              <Button basic onClick={toggleFilterModal}>
                {`경력 ${selectedFilters["years"].text}`}
              </Button>
            </>
          )}
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={5}
          style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button basic onClick={toggleFilterModal}>
            <Icon name="filter" />
            필터
          </Button>
        </Grid.Column>
      </Grid>
      {/* AD Company List */}
      {/* General Company List */}
      {/* Modal */}
      <FilterContext.Provider
        value={{
          filters,
          selectedFilters,
          setFilters,
          setSelectedFilters,
          filterModalOpen,
          toggleFilterModal
        }}>
        <FilterModal />
      </FilterContext.Provider>
    </Container>
  );
};

export default Explorer;
