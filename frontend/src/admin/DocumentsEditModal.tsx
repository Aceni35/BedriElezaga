import { Modal } from '../ui/Modal';
import { Spinner } from '../ui/Spinner';
import { useDocumentItem } from '../hooks/useDocuments';
import { getApiErrorMessage } from '../api/client';
import { DocumentsForm } from './components/DocumentsForm';
import { useI18n } from '../i18n/I18nContext';

interface DocumentsEditModalProps {
  documentId: string | null;
  onClose: () => void;
}

export function DocumentsEditModal({ documentId, onClose }: DocumentsEditModalProps) {
  const isOpen = documentId !== null;
  const { data, isLoading, isError, error } = useDocumentItem(documentId ?? undefined);
  const { t } = useI18n();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.admin.documents.editTitle} maxWidth="640px">
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
      {data && <DocumentsForm mode="edit" initial={data} onDone={() => onClose()} />}
    </Modal>
  );
}
