import styled from 'styled-components';
import theme from '../../styles/theme';


export const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-align: left;
  font-size: ${theme.fontSizes.small};
  color: ${props => props.isSelected ? theme.colors.text.accent : theme.colors.text.body.primary};
  background-color: ${props => props.isSelected ? theme.colors.surface.secondary : 'transparent'};
  border: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.surface.secondary};
  }
`;

export const SelectedLabel = styled.span`
  font-weight: ${props => props.isSelected ? '500' : '400'};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  transition: transform 0.2s ease;
`;


export const FilterContainer = styled.div`
  position: sticky;
  top: 60px; // Match your navbar height
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.surface.primary};
  border-bottom: 1px solid ${theme.colors.border.primary};
  z-index: 10;

  @media (max-width: ${theme.breakpoints.sm}) {
    position: fixed;
    top: 70px; // Adjust this to match your navbar height exactly
    left: 0;
    right: 0;
    flex-direction: column;
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.sm};
  }
`;

export const FilterWrapper = styled.div`
  position: relative;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: transparent;
  border: 1px solid ${theme.colors.border.primary};
  border-radius: 4px;
  font-size: ${theme.fontSizes.small};
  color: ${props => props.isActive ? theme.colors.text.accent : theme.colors.text.body.primary};
  transition: all 0.2s ease;
  min-width: 140px;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    min-width: unset;
  }

  &:hover {
    background-color: ${theme.colors.surface.secondary};
    border-color: ${theme.colors.border.hover};
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 200px;
  background-color: ${theme.colors.surface.primary};
  border: 1px solid ${theme.colors.border.primary};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
  }
`;