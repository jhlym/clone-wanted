/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// components
import { Container, Grid, Icon, Message } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import FilterModal from "./Modal/FilterModal";
import { BasicButton } from "../../components/Button";
import PhotoCard from "../../components/Card/PhotoCard";
// api
import client from "../../api/client";
import { _getFilters, _getJobs } from "../../api/explorer";
// utils
import { convertDropdownFormat } from "../../utils";
// hooks
import useLoading from "../../hooks/useLoading";

export const FilterContext = React.createContext(null);

const Explorer = () => {
  const [filterModalOpen, setFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState(null);
  const [selectedFilters, setSelectedFilters] = React.useState(null);
  const [jobs, setjobs] = React.useState(null);

  // componentDidMount
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // 필터 값 초기화
    const defaultFilters = await initFilters();
    // 필터 값 기반으로 채용 회사 리스트 조회
    await iniJobs(defaultFilters);
  };

  const iniJobs = async selectedObj => {
    try {
      const { data: res } = await _getJobs({
        country: selectedObj.countries.key,
        tag_type_id: 669,
        job_sort: selectedObj.job_sort.key,
        years: selectedObj.years.key,
        locations: selectedObj.locations.map(e => e.key)
      });
      setjobs(res);
    } catch (e) {
      console.dir(e);
    }
  };

  const initFilters = async () => {
    const findSelected = obj => obj.selected === true;
    const getDefaultSelected = obj => {
      return function() {
        const args = Array.from(arguments);
        return args.map(key => obj[key].find(findSelected));
      };
    };
    // call restful api for getting filter options
    try {
      const { data: defaultFilters } = await _getFilters();
      const tmpFilters = convertDropdownFormat(
        defaultFilters,
        "key",
        "display"
      );
      const [jobSort, countries, years] = getDefaultSelected(tmpFilters)(
        "job_sort",
        "countries",
        "years"
      );
      const locations = countries.locations.find(findSelected);
      const tmpSelectedFilters = {
        job_sort: jobSort,
        countries: countries,
        years: years,
        locations: locations !== undefined ? [locations] : []
      };
      setFilters(tmpFilters);
      setSelectedFilters(tmpSelectedFilters);
      return tmpSelectedFilters;
    } catch (e) {
      console.dir(e);
    }
  };

  const loadJobs = () => {
    client.get(jobs.links.next).then(res => {
      const { data, status } = res;
      // TODO: 예외처리
      if (status !== 200) return;
      setjobs({
        data: [...jobs.data, ...data.data],
        links: data.links
      });
    });
  };

  const toggleFilterModal = () => {
    setFilterModal(!filterModalOpen);
  };

  // 카드 선택 시, 해당 job 페이지로 이동
  const moveJobPage = (companyId, postId) => {
    window.location.href = `https://www.wanted.co.kr/wd/${postId}?referer_id=${companyId}`;
  };

  const JobCard = job => (
    <Grid.Column
      width={4}
      key={job.id}
      onClick={() => moveJobPage(job.company.id, job.id)}
    >
      <PhotoCard
        src={job.title_img.thumb}
        title={job.position}
        meta={`${job.address.location} ${job.address.country}`}
        desc={job.company.name}
        content={`채용 보상금 ${job.reward.formatted_total}`}
      />
    </Grid.Column>
  );

  return (
    <Container>
      {/* Filter */}
      <Grid style={{ margin: "10px 0" }}>
        <Grid.Column floated="left" width={10} style={{ paddingLeft: "0px" }}>
          {selectedFilters && (
            <>
              <BasicButton
                onClick={toggleFilterModal}
                title={selectedFilters["job_sort"].text}
              />
              <BasicButton
                title={selectedFilters["countries"].text}
                subtitle="국가"
                onClick={toggleFilterModal}
              />
              {selectedFilters["locations"].length > 0 && (
                <BasicButton
                  title={selectedFilters["locations"][0].display}
                  subtitle="지역"
                  onClick={toggleFilterModal}
                />
              )}
              <BasicButton
                title={selectedFilters["years"].text}
                subtitle="경력"
                onClick={toggleFilterModal}
              />
            </>
          )}
        </Grid.Column>
        <Grid.Column
          floated="right"
          width={5}
          style={{
            paddingRight: "0px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <BasicButton
            icon={() => <Icon name="filter" style={{ color: "#2886fa" }} />}
            title="필터"
            onClick={toggleFilterModal}
          />
        </Grid.Column>
      </Grid>
      {/* AD Company List */}
      {/* General Company List */}
      {/* {jobs && (
        <InfiniteScroll
          dataLength={jobs.data.length}
          next={loadJobs}
          hasMore={jobs.links.next}
          loader={useLoading}
        >
          <Grid>{jobs.data.map(job => JobCard(job))}</Grid>
        </InfiniteScroll>
      )} */}
      {!jobs && useLoading()}
      {jobs && jobs.data && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadJobs}
          hasMore={jobs.links.next !== null}
          loader={<p key={0}>Loading...</p>}
        >
          <Grid>{jobs.data.map(job => JobCard(job))}</Grid>
        </InfiniteScroll>
      )}
      {jobs && !jobs.data && (
        <Message>
          <Message.Header>
            <Icon name="warning" />
            결과를 찾지 못했습니다.
          </Message.Header>
          <p>필터링 옵션을 다시 설정해주세요.</p>
        </Message>
      )}
      {/* Modal */}
      <FilterContext.Provider
        value={{
          filters,
          selectedFilters,
          setSelectedFilters,
          filterModalOpen,
          toggleFilterModal,
          initFilters,
          iniJobs
        }}
      >
        <FilterModal />
      </FilterContext.Provider>
    </Container>
  );
};

export default Explorer;
