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
    open,
    onClose, // modal close
    onAction, // call restful api
    sortOptions,
    careerOptions,
    countries,
    locations
  } = props;
  const [selectedSort, setSort] = React.useState(sortOptions[0].value);
  const [selectedCareer, setCareer] = React.useState(careerOptions[0].value);
  // TODO: 브라우저 국가 코드 기반으로 default
  const [selectedCountry, setCountry] = React.useState("kr");
  const [selectedLocation, setLocation] = React.useState([]);

  // componentDidMount
  React.useEffect(() => {}, []);

  const isCheckedLocation = React.useCallback(
    location => _.find(selectedLocation, e => e === location) !== undefined
  );

  const initLocation = React.useCallback(() => setLocation([]), []);

  // TODO: 초기화 함수 정의
  const reset = React.useCallback(() => {}, []);

  const handleCountryBtn = React.useCallback(
    value => {
      initLocation();
      setCountry(value);
    },
    [initLocation]
  );

  const handleLocationBtn = React.useCallback(
    location => {
      // 선택
      if (!isCheckedLocation(location)) {
        setLocation([...selectedLocation, location]);
      }
      // 선택 해제
      else {
        setLocation(_.filter(selectedLocation, e => location !== e));
      }
    },
    [isCheckedLocation, selectedLocation]
  );

  const applyFliterOption = React.useCallback(() => {
    // TODO: mobx 이용해서 filter 옵션 값 상태관리
    onAction({
      country: selectedCountry,
      job_sort: selectedSort,
      years: selectedCareer,
      locations: selectedLocation
    });
    onClose();
  }, [
    onAction,
    onClose,
    selectedCareer,
    selectedCountry,
    selectedLocation,
    selectedSort
  ]);

  return (
    <Modal size="tiny" open={open} onClose={onClose}>
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
                onClick={onClose}
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
                options={sortOptions}
                defaultValue={selectedSort}
                onChange={(e, { value }) => setSort(value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle>국가</SubTitle>
              <div>
                {countries.map((country, index) => (
                  <OptionButton
                    key={index}
                    selected={selectedCountry === country.value}
                    onClick={() => handleCountryBtn(country.value)}
                  >
                    {country.text}
                  </OptionButton>
                ))}
              </div>
            </Grid.Column>
          </Grid.Row>
          {locations[selectedCountry] && (
            <Grid.Row>
              <Grid.Column width={16}>
                <SubTitle block>지역</SubTitle>
                {locations[selectedCountry].map((location, index) => (
                  <OptionButton
                    key={index}
                    selected={isCheckedLocation(location)}
                    onClick={() => handleLocationBtn(location)}
                  >
                    {location}
                  </OptionButton>
                ))}
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width={16}>
              <SubTitle>경력</SubTitle>
              <Dropdown
                fluid
                selection
                options={careerOptions}
                defaultValue={selectedCareer}
                onChange={(e, { value }) => setCareer(value)}
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
