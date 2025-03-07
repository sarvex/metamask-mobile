import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import renderWithProvider from '../../../util/test/renderWithProvider';
import { ENSCache } from '../../../util/ENSUtils';
import { Transaction } from './AccountFromToInfoCard.types';
import AccountFromToInfoCard from '.';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (fn: any) =>
    fn({
      engine: {
        backgroundState: {
          PreferencesController: {
            selectedAddress: '0x0',
            identities: {
              '0x0': {
                address: '0x0',
                name: 'Account 1',
              },
              '0x1': {
                address: '0x1',
                name: 'Account 2',
              },
            },
          },
          NetworkController: {
            provider: {
              ticker: 'eth',
            },
          },
          AddressBookController: {
            addressBook: {},
          },
        },
      },
    }),
}));

jest.mock('../../../util/address', () => ({
  ...jest.requireActual('../../../util/address'),
  isQRHardwareAccount: jest.fn(),
}));

const mockStore = configureMockStore();
const initialState = {
  settings: {},
  engine: {
    backgroundState: {
      AccountTrackerController: {
        accounts: {
          '0x0': {
            balance: 200,
          },
          '0x1': {
            balance: 200,
          },
        },
      },
      TokenBalancesController: {},
      PreferencesController: {
        selectedAddress: '0x0',
        identities: {
          '0x0': {
            address: '0x0',
            name: 'Account 1',
          },
          '0x1': {
            address: '0x1',
            name: 'Account 2',
          },
        },
      },
      CurrencyRateController: {
        conversionRate: 10,
        currentCurrency: 'usd',
      },
      NetworkController: {
        provider: {
          ticker: 'eth',
        },
        network: '1',
      },
      AddressBookController: {
        addressBook: {
          '1': {
            '0x0': {
              address: '0x0',
              name: 'Account 1',
            },
            '0x1': {
              address: '0x1',
              name: 'Account 2',
            },
          },
        },
      },
    },
  },
};
const store = mockStore(initialState);

const transactionState: Transaction = {
  transaction: { from: '0x0', to: '0x1' },
  transactionTo: '0x1',
  selectedAsset: { isETH: true, address: '0x0', symbol: 'ETH', decimals: 8 },
  transactionToName: 'Account 2',
  transactionFromName: 'Account 1',
};

describe('AccountFromToInfoCard', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AccountFromToInfoCard transactionState={transactionState} />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const container = renderWithProvider(
      <AccountFromToInfoCard transactionState={transactionState} />,
      { state: initialState },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render from address', async () => {
    const { findByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={transactionState} />,
      { state: initialState },
    );
    expect(await findByText('Account 1')).toBeDefined();
  });

  it('should render balance of from address', async () => {
    const { findByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={transactionState} />,
      { state: initialState },
    );
    expect(await findByText('Balance: < 0.00001 ETH')).toBeDefined();
  });

  it('should render to account name', async () => {
    const { findByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={transactionState} />,
      { state: initialState },
    );
    expect(await findByText('Account 2')).toBeDefined();
  });

  it('should render to address', async () => {
    const { findByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={transactionState} />,
      { state: initialState },
    );
    expect(await findByText('0x1...0x1')).toBeDefined();
  });

  it('should render correct to address for NFT send', async () => {
    const NFTTransaction = {
      assetType: 'ERC721',
      selectedAsset: {
        address: '0x26D6C3e7aEFCE970fe3BE5d589DbAbFD30026924',
        standard: 'ERC721',
        tokenId: '13764',
      },
      transaction: {
        data: '0x23b872dd00000000000000000000000007be9763a718c0539017e2ab6fc42853b4aeeb6b000000000000000000000000f4e8263979a89dc357d7f9f79533febc7f3e287b00000000000000000000000000000000000000000000000000000000000035c4',
        from: '0x07Be9763a718C0539017E2Ab6fC42853b4aEeb6B',
        gas: '00',
        to: '0x26D6C3e7aEFCE970fe3BE5d589DbAbFD30026924',
        value: '0x0',
      },
      transactionFromName: 'Account 3',
      transactionTo: '0xF4e8263979A89Dc357d7f9F79533Febc7f3e287B',
      transactionToName: '0xF4e8263979A89Dc357d7f9F79533Febc7f3e287B',
    };
    const { findByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={NFTTransaction as any} />,
      { state: initialState },
    );
    expect(await findByText('0xF4e8...287B')).toBeDefined();
  });

  it('should display ens name', async () => {
    const txState: Transaction = {
      ...transactionState,
      transaction: { from: '0x0', to: '0x3' },
      transactionTo: '0x3',
    };
    (ENSCache.cache as any) = {
      '10x1': {
        name: 'test1.eth',
        timestamp: new Date().getTime(),
      },
      '10x3': {
        name: 'test3.eth',
        timestamp: new Date().getTime(),
      },
    };
    const { queryByText } = renderWithProvider(
      <AccountFromToInfoCard transactionState={txState} />,
      { state: initialState },
    );
    expect(await queryByText('test1.eth')).toBeDefined();
    expect(await queryByText('test3.eth')).toBeDefined();
  });
});
