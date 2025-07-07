import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Header,
  Section,
  SectionData,
  ThemeSettings,
} from "../../types/types";

interface ResumeState {
  header: Header;
  sections: Section[];
  theme: ThemeSettings;
}

const initialState: ResumeState = {
  header: {
    name: "",
    position: "",
    email: "",
    phone: "",
    location: "",
  },
  sections: [],
  theme: {
    fontFamily: "serif",
    fontSize: "medium",
  },
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<Partial<Header>>) => {
      state.header = { ...state.header, ...action.payload };
    },
    setTheme: (state, action: PayloadAction<Partial<ThemeSettings>>) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    addSection: (state, action: PayloadAction<Section["type"]>) => {
      const id = crypto.randomUUID();

      let data: Section["data"];
      switch (action.payload) {
        case "experience":
          data = {
            position: "",
            company: "",
            period: "",
            description: "",
          };
          break;
        case "education":
          data = {
            school: "",
            degree: "",
            period: "",
          };
          break;
        case "skills":
          data = {
            list: "",
          };
          break;
        case "certificates":
          data = {
            title: "",
            issuer: "",
            date: "",
          };
          break;
        case "about":
          data = {
            text: "",
          };
          break;
      }

      state.sections.push({ id, type: action.payload, data });
    },
    updateSection: (
      state,
      action: PayloadAction<{ id: string; data: SectionData }>
    ) => {
      const section = state.sections.find((s) => s.id === action.payload.id);
      if (section) section.data = action.payload.data;
    },
    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter((s) => s.id !== action.payload);
    },
    reorderSections: (state, action: PayloadAction<Section[]>) => {
      state.sections = action.payload;
    },
    resetSections: (state) => {
      state.sections = [];
      state.header = initialState.header;
      localStorage.removeItem("resume_data");
    },
    loadFromStorage: (state, action: PayloadAction<ResumeState>) => {
      return {
        ...state,
        ...initialState,
        ...action.payload,
        theme: {
          ...initialState.theme,
          ...action.payload.theme,
        },
      };
    },
  },
});

export const {
  setHeader,
  setTheme,
  addSection,
  updateSection,
  deleteSection,
  reorderSections,
  resetSections,
  loadFromStorage,
} = resumeSlice.actions;

export default resumeSlice.reducer;
