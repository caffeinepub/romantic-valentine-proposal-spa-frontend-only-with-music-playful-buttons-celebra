import { useLocalStorageState } from './useLocalStorageState';
import { STORAGE_KEYS } from '../lib/storageKeys';

export function useProposalState() {
  const [isAccepted, setIsAccepted] = useLocalStorageState(STORAGE_KEYS.ACCEPTED_STATE, false);

  const acceptProposal = () => {
    setIsAccepted(true);
  };

  const resetProposal = () => {
    setIsAccepted(false);
  };

  return {
    isAccepted,
    acceptProposal,
    resetProposal
  };
}
