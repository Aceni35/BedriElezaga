import { Modal } from '../ui/Modal';
import { Spinner } from '../ui/Spinner';
import { useStaffItem } from '../hooks/useStaff';
import { getApiErrorMessage } from '../api/client';
import { StaffForm } from './components/StaffForm';
import { useI18n } from '../i18n/I18nContext';

interface StaffEditModalProps {
  memberId: string | null;
  onClose: () => void;
}

export function StaffEditModal({ memberId, onClose }: StaffEditModalProps) {
  const isOpen = memberId !== null;
  const { data, isLoading, isError, error } = useStaffItem(memberId ?? undefined);
  const { t } = useI18n();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.staff.editTitle} maxWidth="760px">
      {isLoading && (
        <div className="flex justify-center py-10 text-primary">
          <Spinner size={28} />
        </div>
      )}
      {isError && (
        <div className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200">
          {getApiErrorMessage(error)}
        </div>
      )}
      {data && <StaffForm mode="edit" initial={data} onDone={() => onClose()} />}
    </Modal>
  );
}
