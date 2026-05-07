import { Modal } from '../ui/Modal';
import { DocumentsForm } from './components/DocumentsForm';
import { useI18n } from '../i18n/I18nContext';

interface DocumentsCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentsCreateModal({ isOpen, onClose }: DocumentsCreateModalProps) {
  const { t } = useI18n();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.documents.createTitle} maxWidth="640px">
      <DocumentsForm mode="create" onDone={() => onClose()} />
    </Modal>
  );
}
