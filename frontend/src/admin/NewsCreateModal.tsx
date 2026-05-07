import { Modal } from '../ui/Modal';
import { NewsForm } from './components/NewsForm';
import { useI18n } from '../i18n/I18nContext';

interface NewsCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsCreateModal({ isOpen, onClose }: NewsCreateModalProps) {
  const { t } = useI18n();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.news.createTitle} maxWidth="840px">
      <NewsForm
        mode="create"
        onDone={() => onClose()}
      />
    </Modal>
  );
}
