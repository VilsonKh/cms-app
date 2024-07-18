import React from "react";
import { ListItem, Skeleton } from "@mui/material";

interface SkeletonListProps {
  count: number;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count }) => {
console.log([new Array(count)])
  return (
    <>
      {[...new Array(count)].map((_, index) => (
        <ListItem key={index} alignItems="flex-start">
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ marginLeft: 16, width: '100%' }}>
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="50%" height={20} />
            <Skeleton width="80%" height={20} />
          </div>
        </ListItem>
      ))}
    </>
  );
};

export default SkeletonList;
