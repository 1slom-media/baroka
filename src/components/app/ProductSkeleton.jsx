import { Skeleton, Stack } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Stack gap={10}>
      <Skeleton variant="rectangular" height={250} />
      <Skeleton variant="rectangular" width={90} height={10} />
      <Skeleton variant="rectangular" width={80} height={10} />
      <Skeleton variant="rectangular" height={10} />
    </Stack>
  );
};

export default ProductSkeleton;
