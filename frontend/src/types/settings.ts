export interface SettingsFile {
  key: string;
  url: string;
}

export interface Settings {
  directorName: string;
  timetable: SettingsFile | null;
  rules: SettingsFile | null;
  homeImage1: SettingsFile | null;
  homeImage2: SettingsFile | null;
  homeImage3: SettingsFile | null;
  updatedAt: string;
}

export interface UpdateSettingsInput {
  directorName?: string;
  timetableKey?: string;
  rulesKey?: string;
  homeImage1Key?: string;
  homeImage2Key?: string;
  homeImage3Key?: string;
}
