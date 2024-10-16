import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";

const SkuSelect = ({ list, charLength, selectedSkus, selectSKU, skuList }) => {
  const router = useRouter();

  const handleFetaChange = (value) => {
    const { asPath, pathname, query } = router;
    const existingChar = list?.find((itm) => itm.uid === value);
    let flag = false;
    let existingId = null;
    list?.forEach((imb) => {
      if (selectedSkus?.includes(imb?.uid)) {
        flag = true;
        existingId = imb.uid;
      }
    });
    const existingCharID = selectedSkus?.find((itm) => itm === value);
    if (existingCharID) {
      selectSKU([...selectedSkus?.filter((im) => im !== value)]);
    } else if (flag && existingId) {
      selectSKU([...selectedSkus?.filter((im) => im !== existingId), value]);
    } else {
      selectSKU([...selectedSkus, value]);
    }
    const selectedSkuFullList = [...selectedSkus, value];
    const selectedVariant = skuList?.find((sku) => {
      let isSelected = true;
      sku?.characteristics?.forEach((element) => {
        if (!selectedSkuFullList?.includes(element.uid)) {
          isSelected = false;
        }
      });
      return isSelected;
    });

    if (selectedVariant) {
      query["skuid"] = selectedVariant?.uid;
      router.push({ asPath, query });
    }
  };

  return (
    <Stack mt={1}>
      <Grid container spacing={2}>
        {list?.map((feta) => {
          return (
            <Grid item xs={4} sm={3} key={feta?.uid}>
              <Button
                onClick={() => handleFetaChange(feta.uid)}
                variant="outlined"
                sx={{
                  ...(selectedSkus?.includes(feta.uid) && {
                    borderColor: "currentColor",
                    boxShadow: "0 0 0 0.5px currentColor",
                    background: "rgba(33, 43, 54, 0.08)",
                  }),
                }}
              >
                {feta?.title[router?.locale]}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default SkuSelect;
