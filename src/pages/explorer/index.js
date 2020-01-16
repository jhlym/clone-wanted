import React from "react";

import { Container, Grid, Button, Icon } from "semantic-ui-react";
import FilterModal from "./Modal/FilterModal";

import data from "./mockData";

const Explorer = () => {
  const [filterModalOpen, setFilterModal] = React.useState(false);
  const [companyList, setCompanyList] = React.useState([]);

  const toggleFilterModal = () => {
    setFilterModal(!filterModalOpen);
  };

  const _getCompanyList = params => {
    // TODO: axios 이용하여 restful api 호출
  };

  return (
    <Container>
      {/* Filter */}
      <Grid style={{ margin: "10px 0" }}>
        <Grid.Column floated="left" width={10}>
          <Button basic onClick={toggleFilterModal}>
            최신순
          </Button>
          <Button basic onClick={toggleFilterModal}>
            국가 한국
          </Button>
          <Button basic onClick={toggleFilterModal}>
            지역 서울
          </Button>
          <Button basic onClick={toggleFilterModal}>
            경력 신입
          </Button>
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={5}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button basic onClick={() => toggleFilterModal(true)}>
            <Icon name="filter" />
            필터
          </Button>
        </Grid.Column>
      </Grid>
      {/* AD Company List */}
      {/* General Company List */}
      {/* Modal */}
      <FilterModal
        open={filterModalOpen}
        onClose={toggleFilterModal}
        onAction={_getCompanyList}
        // TODO: api 호출한 결과 값으로 대체 예정
        {...data}
      />
    </Container>
  );
};

export default Explorer;
