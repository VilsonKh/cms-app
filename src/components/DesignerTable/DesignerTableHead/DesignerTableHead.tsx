import React from 'react';
import { TableCell, TableRow, TableSortLabel, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';



interface DesignerTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: 'username' | 'email';
  onRequestSort: (property: 'username' | 'email') => void;
}

const DesignerTableHead: React.FC<DesignerTableHeadProps> = ({ order, orderBy, onRequestSort }) => {

  const {t}=useTranslation()

  const headCells = [
    { id: 'avatar', label: t('Avatar'), sortable: false },
    { id: 'username', label: t('Name'), sortable: true },
    { id: 'email', label:'Email', sortable: true },
    { id: 'tasksClosed', label: t('Tasks Closed'), sortable: false },
    { id: 'tasksInProgress', label: t('Tasks In Progress'), sortable: false },
  ];
  const createSortHandler = (property: 'username' | 'email') => (event: React.MouseEvent<unknown>) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as 'username' | 'email')}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default DesignerTableHead;
