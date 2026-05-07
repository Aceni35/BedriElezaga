export interface SettingsFile {
  key: string;
  url: string;
}

export interface Settings {
  directorName: string;
  timetable: SettingsFile | null;
  rules: SettingsFile | null;
  updatedAt: string;
}

export interface UpdateSettingsInput {
  directorName?: string;
  timetableKey?: string;
  rulesKey?: string;
}
