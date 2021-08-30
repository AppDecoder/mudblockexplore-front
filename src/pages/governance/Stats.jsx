import React, { useMemo } from 'react';
import Helmet from 'react-helmet';
import ColStyled from '../../components/styled/ColStyled';
import useRequest from '../../hooks/useRequest';
import { Container, Row } from '../../components/styled/CustomBsGrid';
import CardProposal from '../../components/governance/CardProposal';
import Spinner from '../../components/Spinner';
import API from '../../api';
import { useChainsStateContext } from '../../store/chainContext';

const Stats = () => {
  const { isLoading, resp } = useRequest(API.getProposals);
  const { chain } = useChainsStateContext();

  const noProposals = useMemo(() => {
    return chain === 'persistence' ? 'No Proposals' : 'No data';
  }, [chain]);

  return (
    <Container>
      <Helmet>
        <title>Cosmos governance statistics | Cosmoscan</title>
        <meta
          name="description"
          content="General data on the Cosmoshub governance process."
        />
        <meta
          itemProp="description"
          content="General data on the Cosmoshub governance process."
        />
        <meta
          property="og:description"
          content="General data on the Cosmoshub governance process."
        />
        <meta
          name="twitter:description"
          content="General data on the Cosmoshub governance process."
        />
      </Helmet>

      <Row>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoading ? (
          <div className="text-center w-100">
            <Spinner />
          </div>
        ) : resp ? (
          resp.map((proposal) => (
            <ColStyled key={proposal.id} xl={6}>
              <CardProposal proposal={proposal} />
            </ColStyled>
          ))
        ) : (
          <div className="text-center w-100">{noProposals}</div>
        )}
      </Row>
    </Container>
  );
};

export default Stats;
