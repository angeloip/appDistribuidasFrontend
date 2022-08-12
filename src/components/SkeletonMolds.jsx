import { SkeletonElement } from "./SkeletonElement";
import stylesCard from "../styles/ProductCard.module.css";
import stylesDetails from "../styles/ProductDetails.module.css";
import stylesAccordion from "../styles/Accordion.module.css";
import styles from "../styles/SkeletonMolds.module.css";

export const ProductCardSkeleton = () => {
  return (
    <div className={stylesCard.productoCardContainer}>
      <div className={stylesCard.subproductoCardContainer}>
        <SkeletonElement type="rectangular" height={130} />
        <SkeletonElement type="text" mb={2} />
        <SkeletonElement type="text" width={"30%"} mb={2} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SkeletonElement
            type="rectangular"
            width={"90%"}
            height={40}
            mb={2}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SkeletonElement type="text" width={"50%"} />
        </div>
      </div>
    </div>
  );
};

export const DetailsProductSkeleton = () => {
  return (
    <div className={stylesDetails.DetallesProductoContainer}>
      <div className={stylesDetails.detallesSubContainer}>
        <div
          className={`${stylesDetails.detallesPhotoProduct} ${styles.detallesPhotoProduct}`}
        >
          <SkeletonElement type="rectangular" height={"100%"} />
        </div>
        <div
          className={stylesDetails.detallesInfoprodct}
          style={{ width: 382 }}
        >
          <div style={{ display: "flex", gap: "15px" }}>
            <SkeletonElement type="rectangular" height={30} width={120} />
            <SkeletonElement type="rectangular" height={30} width={120} />
            <SkeletonElement
              type="rectangular"
              height={30}
              width={120}
              mb={3}
            />
          </div>
          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" height={20} width={"50%"} mb={2} />
          </div>

          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} />
            <SkeletonElement type="text" height={20} width={"60%"} mb={2} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <SkeletonElement type="rectangular" height={40} width={"80%"} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SkeletonElement type="rectangular" height={40} width={"80%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccordionSkeleton = () => {
  return (
    <div className={stylesAccordion.accordion}>
      <div style={{ marginTop: "10px" }}>
        <SkeletonElement type="text" height={25} width={"50%"} mb={2} />
      </div>

      <SkeletonElement type="text" height={25} width={"50%"} mb={2} />

      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
      <SkeletonElement type="text" height={20} width={"60%"} mb={1.5} />
    </div>
  );
};

/* export const DetailsProductSkeleton = () => {
  return (
    <div className={stylesDetails.DetallesProductoContainer}>
      <div className={stylesDetails.detallesSubContainer}>
        <div
          className={`${stylesDetails.detallesPhotoProduct} ${styles.detallesPhotoProduct}`}
        >
          <SkeletonElement type="rectangular" height={"100%"} />
        </div>
        <div
          className={stylesDetails.detallesInfoprodct}
          style={{ width: 382 }}
        >
          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" height={20} width={"50%"} mb={2} />
          </div>

          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" height={20} width={"50%"} />
            <SkeletonElement type="text" height={20} width={"50%"} />
            <SkeletonElement type="text" height={20} width={"50%"} />
            <SkeletonElement type="text" height={20} width={"50%"} mb={2} />
          </div>

          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" mb={2} />
          </div>
          <div>
            <SkeletonElement type="text" width={"30%"} />
            <SkeletonElement type="text" />
            <SkeletonElement type="text" mb={2} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <SkeletonElement type="rectangular" height={40} width={"80%"} />
          </div>
        </div>
      </div>
    </div>
  );
}; */
