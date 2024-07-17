import React from 'react';
import { TableRow, TableCell, Avatar } from '@mui/material';
import { getTasksAmount } from '../../../utils/countHelpers';

interface Designer {
  id: string;
  avatar: string;
  username: string;
  email: string;
  issues: { status: string }[];
}

interface DesignerTableRowProps {
  designer: Designer;
}

const DesignerTableRow: React.FC<DesignerTableRowProps> = ({ designer }) => {
  return (
    <TableRow key={designer.id}>
      <TableCell>
        <Avatar src={designer.avatar} />
      </TableCell>
      <TableCell>{designer.username}</TableCell>
      <TableCell>{designer.email}</TableCell>
      <TableCell>{getTasksAmount(designer.issues, "Done")}</TableCell>
      <TableCell>{getTasksAmount(designer.issues, "In Progress")}</TableCell>
    </TableRow>
  );
};

export default DesignerTableRow;
