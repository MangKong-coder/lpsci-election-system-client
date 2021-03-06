// ANCHOR React
import * as React from 'react';

// ANCHOR Base
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { Paragraph1 } from 'baseui/typography';

// ANCHOR Models
import { IPosition } from 'models/interface/Vote';

// ANCHOR Utils
import { getCandidate } from '@lpsci/utils/api/candidate';

// ANCHOR Components
import { VotingTab } from 'scoped-models/voting/VotingTab';
import { ReviewCardCandidate } from '../ReviewCardCandidate';

// ANCHOR Styles
import { ABSTAIN, SELECTED, OPAQUE } from './styles';

interface IReviewCardRadioProps {
  position: IPosition;
}

export const ReviewCardRadio = React.memo(({ position }: IReviewCardRadioProps) => {
  const [voteList, setVoteList] = VotingTab.useSelectors((state) => [
    state.voteList, state.setVoteList,
  ]);
  const [value, setValue] = React.useState<string>(position);

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    voteList && voteList.forEach((item) => {
      // eslint-disable-next-line no-unused-expressions
      item.position === position && setValue(item.id ?? position);
    });
  }, [position, voteList]);

  const [fetchedCandidate, setFetchedCandidate] = React.useState<any>([]);
  const [hasFetched, setHasFetched] = React.useState(false);

  const temporaryFetch: any = [];

  React.useEffect(() => {
    if (hasFetched === false) {
      getCandidate()
        .then((response) => {
          response.data.map((item: any) => (
            temporaryFetch.push(item)
          ));
          setFetchedCandidate([...temporaryFetch]);
          setHasFetched(true);
        });
    }
  }, [hasFetched, temporaryFetch]);

  return (
    <RadioGroup
      value={value}
      onChange={(e) => {
        // eslint-disable-next-line no-unused-expressions
        e.target.value === position && (
          voteList && voteList.forEach((vote) => {
            // eslint-disable-next-line no-unused-expressions
            vote.position === position && (
              Object.assign(vote, {
                id: undefined,
                firstName: undefined,
                lastName: undefined,
                party: undefined,
                imageURL: undefined,
              })
            );
          })
        );
        fetchedCandidate.forEach((candidate: any) => {
          // eslint-disable-next-line no-unused-expressions
          candidate.id === e.target.value && (
            voteList && voteList.forEach((vote) => {
              // eslint-disable-next-line no-unused-expressions
              vote.position === candidate.position && (
                Object.assign(vote, candidate)
              );
            })
          );
        });
        localStorage.setItem('voteList', JSON.stringify(voteList));
        setVoteList(JSON.parse(localStorage.getItem('voteList') ?? '[{}]'));
      }}
      align={ALIGN.vertical}
    >
      {
        fetchedCandidate.map((candidate: any) => (
          candidate.position === position
          && (
            <Radio
              key={candidate.id}
              overrides={value === candidate.id ? SELECTED : OPAQUE}
              value={candidate.id}
            >
              <ReviewCardCandidate candidate={candidate} />
            </Radio>
          )
        ))
      }
      <Radio overrides={value === position ? SELECTED : OPAQUE} value={position}>
        <Paragraph1 overrides={ABSTAIN}>Abstain</Paragraph1>
      </Radio>
    </RadioGroup>
  );
});
