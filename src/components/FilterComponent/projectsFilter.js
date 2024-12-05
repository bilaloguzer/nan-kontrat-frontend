import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import {
  FilterContainer,
  DropdownContent,
  FilterButton,
  FilterWrapper,
  IconWrapper,
  OptionButton,
  SelectedLabel,
} from "./FilterComponentStyles";

const FilterDropdown = ({ label, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === selected);

  return (
    <FilterWrapper>
      <FilterButton
        onClick={() => setIsOpen(!isOpen)}
        isActive={selected !== null}
      >
        <SelectedLabel isSelected={selected !== null}>
          {selectedOption ? selectedOption.label : label}
        </SelectedLabel>
        <IconWrapper isOpen={isOpen}>
          <ChevronDown size={16} />
        </IconWrapper>
      </FilterButton>

      <DropdownContent isOpen={isOpen}>
        <OptionButton
          onClick={() => {
            onChange(null);
            setIsOpen(false);
          }}
          isSelected={selected === null}
        >
          All
        </OptionButton>
        {options.map((option) => (
          <OptionButton
            key={option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            isSelected={selected === option.value}
          >
            {option.label}
          </OptionButton>
        ))}
      </DropdownContent>
    </FilterWrapper>
  );
};

const ProjectFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    projectState: null,
    workType: null,
  });

  const stateOptions = useMemo(() => [
    { value: "ongoing", label: "Ongoing" },
    { value: "done", label: "Done" },
  ], []);

  const workOptions = useMemo(() => [
    { value: "Marble Work", label: "Marble" },
    { value: "Wood Work", label: "Wood" },
    { value: "Metal Work", label: "Metal" },
    { value: "Glass Work", label: "Glass" },
  ], []);

  const handleStateChange = useCallback((value) => {
    setFilters(prev => {
      const newFilters = { ...prev, projectState: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  const handleWorkTypeChange = useCallback((value) => {
    setFilters(prev => {
      const newFilters = { ...prev, workType: value };
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);

  return (
    <FilterContainer>
      <FilterDropdown
        label="Project State"
        options={stateOptions}
        selected={filters.projectState}
        onChange={handleStateChange}
      />
      <FilterDropdown
        label="Work Type"
        options={workOptions}
        selected={filters.workType}
        onChange={handleWorkTypeChange}
      />
    </FilterContainer>
  );
};

export default ProjectFilters;