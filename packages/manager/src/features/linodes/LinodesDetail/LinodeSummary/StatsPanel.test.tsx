import * as React from 'react';
import CircleProgress from 'src/components/CircleProgress';
import ErrorState from 'src/components/ErrorState';
import { STATS_NOT_READY_MESSAGE } from '../LinodeNetworking/NetworkingSummaryPanel/TransferHistory';
import { StatsPanel } from './StatsPanel';
import { shallow } from 'enzyme';

const renderMain = jest.fn();
const title = 'Stats About My Linode';

const component = shallow(
  <StatsPanel
    title={title}
    height={300}
    loading={true}
    error={undefined}
    renderBody={renderMain}
  />
);

describe('StatsPanel component', () => {
  it('should render a loading spinner on loading state', () => {
    expect(
      component.containsMatchingElement(<CircleProgress mini />)
    ).toBeTruthy();
    expect(renderMain).not.toHaveBeenCalled();
  });
  it('should render an error on error state', () => {
    const error = 'This is an error.';
    component.setProps({ loading: false, error });
    expect(
      component.containsMatchingElement(<CircleProgress mini />)
    ).toBeFalsy();
    expect(
      component.containsMatchingElement(<ErrorState errorText={error} />)
    ).toBeTruthy();
    expect(renderMain).not.toHaveBeenCalled();
  });
  it('should call its renderContent function if neither error or loading', () => {
    component.setProps({ error: undefined });
    expect(renderMain).toHaveBeenCalled();
  });
  it('should render a friendly message if graph data is not yet available', () => {
    component.setProps({ isTooEarlyForGraphData: true });
    expect(
      component.find('[data-qa-graphs-unavailable]').children().text()
    ).toBe(STATS_NOT_READY_MESSAGE);
  });
});
