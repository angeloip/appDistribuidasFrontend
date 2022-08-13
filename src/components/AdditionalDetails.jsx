import { jsPDF } from "jspdf";
import noImg from "../img/no-image-dish.png";
import bg from "../img/bgpdf-2.png";
import styles from "../styles/AdditionalDetails.module.css";

export const AdditionalDetails = ({ dish }) => {
  const pdfGenerate = () => {
    let pdf = new jsPDF();

    const imgBgProps = pdf.getImageProperties(bg);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgBgWidth = imgBgProps.width;
    const imgbgHeight = imgBgProps.height;

    const scale = Math.max(pdfHeight / imgbgHeight, pdfWidth / imgBgWidth);
    const finalWidth = imgBgWidth * scale;
    const finalHeight = imgbgHeight * scale;
    const leftMargin = (pdfWidth - finalWidth) / 2;

    pdf.addImage(
      bg,
      "PNG",
      leftMargin,
      0,
      finalWidth,
      finalHeight,
      "alias",
      "FAST"
    );

    let imgProps = {};
    if (dish.image.url !== "") {
      imgProps = pdf.getImageProperties(dish.image.url);
    } else {
      imgProps = pdf.getImageProperties(noImg);
    }
    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgHeight = 60;
    const relation = imgProps.height / imgHeight;
    const imgWidth = imgProps.width / relation;
    const marginLeft = (pageWidth - imgWidth) / 2;

    pdf.text(dish.name, pageWidth / 2, 10, { align: "center" });
    pdf.addImage(
      dish.image.url || noImg,
      "PNG",
      marginLeft,
      20,
      imgWidth,
      imgHeight
    );
    pdf.text(dish.category, pageWidth / 2, 90, { align: "center" });
    pdf.text("Ingredientes: ", 10, 100);
    pdf.setFontSize(12);
    pdf.setTextColor("#737373");
    dish.ingredients.map((ingredient, index) =>
      pdf.text(`• ${ingredient}`, 10, 100 + 5 * (index + 1), {
        maxWidth: pdfWidth - 20
      })
    );
    let axisY = dish.ingredients.reduce(
      (previousValue, currentValue) => previousValue + 5,
      100
    );

    pdf.setFontSize(16);
    pdf.setTextColor("#000");
    pdf.text("Beneficios: ", 10, axisY + 10);
    pdf.setFontSize(12);
    pdf.setTextColor("#737373");
    dish.benefits.map((benefit, index) =>
      pdf.text(`• ${benefit}`, 10, axisY + 10 + 5 * (index + 1), {
        maxWidth: pdfWidth - 20
      })
    );
    axisY = dish.benefits.reduce(
      (previousValue, currentValue) => previousValue + 5,
      axisY + 10
    );

    pdf.setFontSize(16);
    pdf.setTextColor("#000");
    pdf.text("Preparación: ", 10, axisY + 10);
    pdf.setFontSize(12);
    pdf.setTextColor("#737373");
    pdf.text(dish.preparation, 10, axisY + 15, {
      maxWidth: pdfWidth - 20
    });

    pdf.save(`${dish.name}.pdf`);
  };

  return (
    <div className={styles.additionalDetailsContainer}>
      <div className={styles.btns}>
        <button onClick={() => pdfGenerate()} className={styles.btnGenerate}>
          Descargar PDF de la receta
        </button>
      </div>
      <div className={styles.videoContainer}>
        <iframe
          src="https://drive.google.com/file/d/15j_2Una2IHs5bBFAijLll6ywrYR0yDyq/preview"
          width="560"
          height="315"
          title="Preparación paso a paso"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
