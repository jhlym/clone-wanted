import React from "react";

import { Container, Grid, Button, Icon } from "semantic-ui-react";
import { FilterModal } from "../../components/Modal";

import data from "./mockData";

const Explorer = () => {
  const [filterModalOpen, setFilterModal] = React.useState(false);

  const toggleFilterModal = () => {
    setFilterModal(!filterModalOpen);
  };

  return (
    <Container>
      {/* Filter */}
      <Grid style={{ margin: "10px 0" }}>
        <Grid.Column floated="left" width={10}>
          <Button basic onClick={() => toggleFilterModal(true)}>
            최신순
          </Button>
          <Button basic onClick={() => toggleFilterModal(true)}>
            국가 한국
          </Button>
          <Button basic onClick={() => toggleFilterModal(true)}>
            지역 서울
          </Button>
          <Button basic onClick={() => toggleFilterModal(true)}>
            경력 신입
          </Button>
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={5}
          style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button basic onClick={() => toggleFilterModal(true)}>
            <Icon name="filter" />
            필터
          </Button>
        </Grid.Column>
      </Grid>
      {/* Modal */}
      <FilterModal
        open={filterModalOpen}
        onClose={toggleFilterModal}
        {...data}
      />
    </Container>
  );
};

export default Explorer;
