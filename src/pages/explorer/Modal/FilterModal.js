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
    setSelectedFilters,
    filterModalOpen,
    toggleFilterModal,
    initFilters,
    getJobs
  } = React.useContext(FilterContext);

  const [localFilters, setLocalFilters] = React.useState(null);

  // componentDidMount
  React.useEffect(() => {
    setLocalFilters(selectedFilters);
  }, [selectedFilters]);

  // 적용 버튼 이벤트 헨들러
  const applyFliterOption = React.useCallback(() => {
    toggleFilterModal();
    setSelectedFilters(localFilters);
    getJobs(localFilters);
  }, [getJobs, localFilters, setSelectedFilters, toggleFilterModal]);

  const handleLocationBtn = React.useCallback(
    location => {
      const DEFAULT_KEY = "all";
      // 이미 선택 된 버튼인지 체크
      function isCheckedLocation() {
        return (
          localFilters["locations"].find(e => e.key === location.key) !==
          undefined
        );
      }
      // 선택
      if (!isCheckedLocation()) {
        let selectedLocation = [];
        // 전체 선택을 하면 전체 하나만 선택하게 변경
        if (location.key === DEFAULT_KEY) {
          selectedLocation = [location];
        }
        // 전체가 아닌 경우는
        else {
          selectedLocation = [
            ...localFilters.locations.filter(e => e.key !== DEFAULT_KEY),
            location
          ];
        }
        setLocalFilters({
          ...localFilters,
          locations: selectedLocation
        });
      }
      // 선택 해제(전체는 클라이언트 이벤트로 해제 불가능)
      else if (location.key !== DEFAULT_KEY) {
        let selectedLocation = [];
        // 아무것도 선택된 것이 없다면 전체를 default로 전체 선택
        if (localFilters.locations.length === 1) {
          selectedLocation = [
            localFilters["countries"].locations.find(e => e.key === DEFAULT_KEY)
          ];
        } else {
          selectedLocation = localFilters.locations.filter(
            e => e.key !== location.key
          );
        }
        setLocalFilters({
          ...localFilters,
          locations: selectedLocation
        });
      }
    },
    [localFilters]
  );

  const handleCountryBtn = React.useCallback(
    country => {
      const location = country.locations.find(e => e.selected === true);
      setLocalFilters({
        ...localFilters,
        countries: country,
        locations: location !== undefined ? [location] : []
      });
    },
    [localFilters]
  );

  const handleDropdown = (e, data) => {
    const { options, value } = data;
    const objkey = options[0].objkey;
    setLocalFilters({
      ...selectedFilters,
      [objkey]: options.find(e => e.value === value)
    });
  };

  if (!filters || !localFilters) return null;

  return (
    <Modal size="tiny" open={filterModalOpen} onClose={toggleFilterModal}>
      <Modal.Header style={{ fontSize: "1.1rem" }}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column onClick={initFilters} style={{ cursor: "pointer" }}>
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
                key={localFilters["job_sort"].key}
                fluid
                selection
                options={filters.job_sort}
                defaultValue={localFilters["job_sort"].value}
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
                    selected={localFilters["countries"].value === country.value}
                    onClick={() => handleCountryBtn(country)}
                  >
                    {country.text}
                  </OptionButton>
                ))}
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle block>지역</SubTitle>
              {localFilters["countries"].locations.map((location, index) => (
                <OptionButton
                  key={index}
                  selected={
                    localFilters["locations"].find(
                      e => e.key === location.key
                    ) !== undefined
                  }
                  onClick={() => handleLocationBtn(location)}
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
                key={localFilters["years"].key}
                fluid
                selection
                options={filters.years}
                defaultValue={localFilters["years"].value}
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
