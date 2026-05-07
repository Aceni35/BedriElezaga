import { Modal } from '../ui/Modal';
import { Spinner } from '../ui/Spinner';
import { useNewsItem } from '../hooks/useNews';
import { getApiErrorMessage } from '../api/client';
import { NewsForm } from './components/NewsForm';
import { useI18n } from '../i18n/I18nContext';

interface NewsEditModalProps {
  articleId: string | null;
  onClose: () => void;
}

export function NewsEditModal({ articleId, onClose }: NewsEditModalProps) {
  const isOpen = articleId !== null;
  const { data, isLoading, isError, error } = useNewsItem(articleId ?? undefined);
  const { t } = useI18n();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.news.editTitle} maxWidth="840px">
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
      {data && <NewsForm mode="edit" initial={data} onDone={() => onClose()} />}
    </Modal>
  );
}
