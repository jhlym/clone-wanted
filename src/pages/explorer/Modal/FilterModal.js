import React from "react";
import styled, { css } from "styled-components";
import * as _ from "lodash";
import {
  Button,
  Modal,
  Icon,
  Grid,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import { OptionButton } from "../../../components/Button/";

import { FilterContext } from "../index";

const SubTitle = styled.p`
  ${props =>
    props.block
      ? css`
          display: block;
        `
      : css`
          display: inline-block;
        `}
  color: #999;
  font-weight: 400;
  margin: 0 0 10px;
`;

const headerToolStyle = {
  color: "#999"
};

const FilterModal = props => {
  const {
    filters,
    selectedFilters,
    setFilters,
    setSelectedFilters,
    filterModalOpen,
    toggleFilterModal
  } = React.useContext(FilterContext);

  // componentDidMount
  React.useEffect(() => {}, []);

  // const isCheckedLocation = React.useCallback(
  //   location => _.find(selectedLocation, e => e === location) !== undefined
  // );

  // TODO: 초기화 함수 정의
  const reset = React.useCallback(() => {}, []);

  // const handleLocationBtn = React.useCallback(
  //   location => {
  //     // 선택
  //     if (!isCheckedLocation(location)) {
  //       setLocation([...selectedLocation, location]);
  //     }
  //     // 선택 해제
  //     else {
  //       setLocation(_.filter(selectedLocation, e => location !== e));
  //     }
  //   },
  //   [isCheckedLocation, selectedLocation]
  // );

  const applyFliterOption = React.useCallback(() => {
    toggleFilterModal();
  }, [toggleFilterModal]);

  const handleOptionBtn = React.useCallback(
    (objkey, value) =>
      setSelectedFilters({
        ...selectedFilters,
        [objkey]: value
      }),
    [selectedFilters, setSelectedFilters]
  );

  const handleDropdown = (e, data) => {
    const { options, value } = data;
    const objkey = options[0].objkey;
    setSelectedFilters({
      ...selectedFilters,
      [objkey]: options.find(e => e.value === value)
    });
  };

  if (!filters || !selectedFilters) return null;

  return (
    <Modal size="tiny" open={filterModalOpen} onClose={toggleFilterModal}>
      <Modal.Header style={{ fontSize: "1.1rem" }}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column onClick={reset} style={{ cursor: "pointer" }}>
              <Icon name="refresh" size="small" style={headerToolStyle} />
              <SubTitle>초기화</SubTitle>
            </Grid.Column>
            <Grid.Column textAlign="center">필터</Grid.Column>
            <Grid.Column textAlign="right">
              <Icon
                link
                name="close"
                onClick={toggleFilterModal}
                style={headerToolStyle}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Header>

      <Modal.Content>
        <Grid container>
          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle>정렬</SubTitle>
              <Dropdown
                fluid
                selection
                options={filters.job_sort}
                defaultValue={selectedFilters["job_sort"].value}
                onChange={handleDropdown}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle>국가</SubTitle>
              <div>
                {filters.countries.map((country, index) => (
                  <OptionButton
                    key={index}
                    selected={
                      selectedFilters["countries"].value === country.value
                    }
                    onClick={() => handleOptionBtn("countries", country)}>
                    {country.text}
                  </OptionButton>
                ))}
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle block>지역</SubTitle>
              {selectedFilters["countries"].locations.map((location, index) => (
                <OptionButton
                  key={index}
                  // selected={selectedFilters['locations']}
                  // onClick={() => handleOptionBtn("countries", country)}
                >
                  {location.display}
                </OptionButton>
              ))}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle>경력</SubTitle>
              <Dropdown
                fluid
                selection
                options={filters.years}
                defaultValue={selectedFilters["years"].value}
                onChange={handleDropdown}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              {/* TODO: localstorage 이용 */}
              <Checkbox label="적용된 필터를 저장하고 유지합니다." />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>

      <Modal.Actions>
        {/* 적용 버튼 */}
        <Button primary onClick={applyFliterOption}>
          적용
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

FilterModal.defaultProps = {
  open: false,
  sortOptions: [],
  careerOptions: [],
  onClose: () => {},
  onAction: () => {}
};

export default FilterModal;
