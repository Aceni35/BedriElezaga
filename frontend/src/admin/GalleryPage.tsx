import { useState } from 'react';
import { useGallery, useUpsertGalleryItem, useDeleteGalleryItem } from '../hooks/useGallery';
import { uploadsService } from '../services/uploads.service';
import { getApiErrorMessage } from '../api/client';
import { Spinner } from '../ui/Spinner';
import { FileDropZone } from '../ui/FileDropZone';
import { STAFF_CATEGORIES } from '../types/staff';
import { ABOUT_CATEGORIES, STUDENTS_CATEGORIES, HOME_CATEGORIES, type GallerySection } from '../types/gallery';
import type { GalleryItem } from '../types/gallery';
import { useI18n } from '../i18n/I18nContext';

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]);

export function GalleryPage() {
  const { t } = useI18n();
  const g = t.admin.gallery;
  const aCommon = t.admin.common;
  const { data, isLoading, isError, error } = useGallery();
  const upsert = useUpsertGalleryItem();
  const remove = useDeleteGalleryItem();

  const itemsBySectionCategory = new Map<string, GalleryItem>();
  for (const item of data?.items ?? []) {
    itemsBySectionCategory.set(`${item.section}:${item.category}`, item);
  }

  const aboutLabels: Record<string, string> = {
    history: g.aboutHistory,
    mission: g.aboutMission,
  };

  const studentsLabels: Record<string, string> = {
    orari: g.studentsOrari,
    rregullorja: g.studentsRregullorja,
  };

  const homeLabels: Record<string, string> = {
    image1: g.homeImage1,
    image2: g.homeImage2,
    image3: g.homeImage3,
  };

  const renderSlot = (section: GallerySection, category: string, label: string) => (
    <CategorySlot
      key={`${section}:${category}`}
      section={section}
      category={category}
      label={label}
      current={itemsBySectionCategory.get(`${section}:${category}`) ?? null}
      onUpload={async (file) => {
        const uploaded = await uploadsService.uploadFile(file);
        await upsert.mutateAsync({ section, category, pictureKey: uploaded.key });
      }}
      onRemove={() => remove.mutateAsync({ section, category })}
      labels={{
        upload: g.uploadImage,
        replace: g.replaceImage,
        hint: g.imageHint,
        onlyAllowed: g.onlyAllowedImages,
        empty: g.empty,
        remove: aCommon.remove,
      }}
    />
  );

  return (
    <div className="px-8 py-10 max-w-[1100px]">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">{g.title}</h1>
        <p className="text-sm text-ink-soft mt-1">{g.subtitle}</p>
      </div>

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

      {!isLoading && (
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-base font-semibold mb-4">{g.sectionStaffTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STAFF_CATEGORIES.map((c) => renderSlot('staff', c, t.staff.categories[c] || c))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold mb-4">{g.sectionAboutTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ABOUT_CATEGORIES.map((c) => renderSlot('about', c, aboutLabels[c] || c))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold mb-4">{g.sectionStudentsTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STUDENTS_CATEGORIES.map((c) => renderSlot('students', c, studentsLabels[c] || c))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold mb-4">{g.sectionHomeTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {HOME_CATEGORIES.map((c) => renderSlot('home', c, homeLabels[c] || c))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

interface CategorySlotProps {
  section: GallerySection;
  category: string;
  label: string;
  current: GalleryItem | null;
  onUpload: (file: File) => Promise<void>;
  onRemove: () => Promise<void>;
  labels: {
    upload: string;
    replace: string;
    hint: string;
    onlyAllowed: string;
    empty: string;
    remove: string;
  };
}

function CategorySlot({ label, current, onUpload, onRemove, labels }: CategorySlotProps) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleFiles = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (!ALLOWED_IMAGE_TYPES.has(f.type) && !f.type.startsWith('image/')) {
      setError(labels.onlyAllowed);
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await onUpload(f);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    setError(null);
    setBusy(true);
    try {
      await onRemove();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="p-3 rounded-xl border border-line bg-surface flex flex-col">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-xs font-medium text-ink truncate">{label}</div>
        {current && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={busy}
            className="text-[11px] text-ink-soft hover:text-red-600 shrink-0 disabled:opacity-50"
          >
            {labels.remove}
          </button>
        )}
      </div>

      {current ? (
        <a
          href={current.picture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full aspect-[4/3] rounded-lg overflow-hidden bg-bg border border-line mb-2"
        >
          <img src={current.picture.url} alt="" className="w-full h-full object-cover" />
        </a>
      ) : (
        <div className="w-full aspect-[4/3] rounded-lg bg-bg border border-dashed border-line mb-2 flex items-center justify-center text-[11px] text-ink-soft">
          {labels.empty}
        </div>
      )}

      <FileDropZone
        accept="image/*"
        onFiles={handleFiles}
        title={current ? labels.replace : labels.upload}
        hint={labels.hint}
        className="!py-3 !gap-1"
      />

      {busy && (
        <div className="mt-1 flex items-center gap-2 text-[11px] text-primary">
          <Spinner size={12} />
        </div>
      )}
      {error && <div className="mt-1 text-[11px] text-red-600">{error}</div>}
    </div>
  );
}
