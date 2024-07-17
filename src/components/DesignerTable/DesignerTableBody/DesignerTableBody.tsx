import React from 'react';
import { TableBody, TableRow, TableCell, Avatar } from '@mui/material';
import TableSkeleton from '../TableSkeleton';
import { getTasksAmount } from '../../../utils/countHelpers';
import DesignerTableRow from '../DesignerTableRow/DesignerTableRow';


interface Designer {
  id: string;
  avatar: string;
  username: string;
  email: string;
  issues: { status: string }[];
}

interface DesignerTableBodyProps {
  data: Designer[];
  loading: boolean;
  rowsPerPage: number;
}

const DesignerTableBody: React.FC<DesignerTableBodyProps> = ({ data, loading, rowsPerPage }) => {
  if (loading) {
    return <TableSkeleton rows={rowsPerPage} />;
  }

  return (
    <TableBody>
      {data.map((designer) => (
        <DesignerTableRow key={designer.id} designer={designer} />
      ))}
    </TableBody>
  );
};

export default DesignerTableBody;