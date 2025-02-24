import React, { useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const programmingLanguages = [
  "JavaScript", "TypeScript", "Python", "Java", "C#", "Ruby", "PHP", "Swift", "Kotlin", "Go", "Rust", "C++", "C", "Dart"
];

const LanguageSelector = ({ onSelect, value }: { onSelect: (language: string) => void; value: string }) => (
  <Autocomplete
    options={programmingLanguages}
    freeSolo
    value={value}
    onInputChange={(_event, newValue) => onSelect(newValue)}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Pesquisar linguagem"
        variant="outlined"
        className="bg-[#121214] text-gray-100 focus:outline-none focus:border-violet-800 focus:border-[1px] border-[1px] border-transparent"
      />
    )}
  />
);

const SelectedLanguages = ({ languages, onRemove }: { languages: string[]; onRemove: (language: string) => void }) => (
  <div className="w-full p-2 rounded-md min-h-[80px] flex flex-wrap gap-2 bg-[#121214] text-gray-200">
    {languages.length === 0 ? (
      <span className="text-gray-400">Nenhuma linguagem adicionada.</span>
    ) : (
      languages.map((language) => (
        <Chip
          key={language}
          label={language}
          onDelete={() => onRemove(language)}
          sx={{ backgroundColor: "#5b21b6", color: "white" }}
        />
      ))
    )}
  </div>
);

const JobRequirements = ({ onChange }: { onChange: (languages: string[]) => void }) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState<string>("")

  const handleAddLanguage = (newLanguage: string) => {
    setCurrentInput(newLanguage);
    if (newLanguage && !selectedLanguages.includes(newLanguage)) {
      const updatedLanguages = [...selectedLanguages, newLanguage]
      setSelectedLanguages(updatedLanguages);
      onChange(updatedLanguages)
    }
  }

  const handleRemoveLanguage = (language: string) => {
    const updatedLanguages = selectedLanguages.filter((lang) => lang !== language)
    setSelectedLanguages(updatedLanguages)
    onChange(updatedLanguages)
  };

  return (
    <div className="py-4 space-y-4">
      <LanguageSelector onSelect={handleAddLanguage} value={currentInput} />
      <label className="w-auto font-medium text-gray-200 mt-1">Requisitos</label>
      <SelectedLanguages languages={selectedLanguages} onRemove={handleRemoveLanguage} />
    </div>
  );
};

export default JobRequirements;
