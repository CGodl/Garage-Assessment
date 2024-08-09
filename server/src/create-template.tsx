import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";


type TemplateData = {
    // id: string
    // createdAt: string
    // updatedAt: string
    // itemBrand: string
    listingTitle: string
    listingDescription: string
    sellingPrice: number
    // isShippable: boolean
    // imageUrls: string[]
    // itemAge: number
    // itemWeight: number
    // addressPrimary: string
    // addressSecondary: string
    // addressCity: string
    // addressState: string
    // addressZip: string
};

  interface PDFProps {
    data: TemplateData;
  }

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    heading: {
      fontSize: 24,
      fontWeight: 600,
      color: "#131925",
      marginBottom: 8
    },
    statement: {
      fontSize: 20,
      color: "#131925",
      lineHeight: 1.4,
      marginBottom: 4,
    },
    divider: {
      width: "100%",
      height: 1,
      backgroundColor: "#999999",
      margin: "24px 0 24px 0"
    },
    paragraph: {
      fontSize: 12,
      color: "#212935",
      lineHeight: 1.67,
    },
    columnParent: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    columnStart: {
      flex: 1,
    },
    columnEnd: {
      flex: 1,
      alignItems: "flex-end"
    },
  });




  const PDF = ({ data }: PDFProps) => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.columnParent}>
              <View style={styles.columnStart}>
                <Text style={styles.heading}>{data.listingTitle}</Text>
                <Text style={styles.paragraph}>{data.listingDescription}</Text>
              </View>
              <View style={styles.columnEnd}>
                <Text style={styles.heading}>Invoice</Text>
                <Text style={styles.paragraph}>Selling Price: {data.sellingPrice}</Text>
              </View>
            </View>
            <View style={styles.divider}></View>
            <View>
              <Text style={styles.paragraph}>Thank you for your business!</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  export default async (data: TemplateData) => {
    return await ReactPDF.renderToStream(<PDF {...{ data }} />);
  };