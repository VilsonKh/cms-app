import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getDesigners } from '../../store/slices/designersSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Avatar,
} from '@mui/material';

const DesignerTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const designers = useSelector((state: RootState) => state.designers.list);

  useEffect(() => {
    dispatch(getDesigners());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tasks Closed</TableCell>
            <TableCell>Tasks In Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {designers.map((designer) => (
            <TableRow key={designer.id}>
              <TableCell>
                <Avatar src={designer.avatar} />
              </TableCell>
              <TableCell>{designer.name}</TableCell>
              <TableCell>{designer.email}</TableCell>
              <TableCell>{designer.closedTasks}</TableCell>
              <TableCell>{designer.inProgressTasks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DesignerTable;
