import React from "react";
import styled, { css } from "styled-components";
import {
  Button,
  Modal,
  Icon,
  Grid,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import OptionButton from "../Button/OptionButton";

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
    onClose,
    sortOptions,
    careerOptions,
    countries,
    locations
  } = props;
  // TODO: 브라우저 국가 코드 기반으로 default
  const [selectedCountry, setCountry] = React.useState("kr");
  const [selectedLocation, setLocation] = React.useState([]);
  // React.useEffect(() => {}, [selectedCountry]);

  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header style={{ fontSize: "1.1rem" }}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column
              onClick={() => window.alert("init")}
              style={{ cursor: "pointer" }}>
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
                defaultValue={sortOptions[0].value}
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
                    onClick={() => setCountry(country.value)}>
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
                  // TODO: 지역 선택 로직 개발 필요
                  <OptionButton
                    key={index}
                    // selected={selectedCountry === country.value}
                    // onClick={() => setCountry(country.value)}
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
                defaultValue={careerOptions[0].value}
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
        <Button primary>적용</Button>
      </Modal.Actions>
    </Modal>
  );
};

FilterModal.defaultProps = {
  open: false,
  sortOptions: [],
  careerOptions: [],
  onClose: () => {}
};

export default FilterModal;
