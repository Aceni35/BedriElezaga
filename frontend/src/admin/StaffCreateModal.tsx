import { Modal } from '../ui/Modal';
import { StaffForm } from './components/StaffForm';
import { useI18n } from '../i18n/I18nContext';

interface StaffCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StaffCreateModal({ isOpen, onClose }: StaffCreateModalProps) {
  const { t } = useI18n();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.staff.createTitle} maxWidth="760px">
      <StaffForm mode="create" onDone={() => onClose()} />
    </Modal>
  );
}
