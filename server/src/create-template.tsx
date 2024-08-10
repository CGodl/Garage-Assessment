import React from 'react';
import ReactPDF, {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

type TemplateData = {
	id: string;
	createdAt: string;
	updatedAt: string;
	itemBrand: string;
	listingTitle: string;
	listingDescription: string;
	sellingPrice: number;
	isShippable: boolean;
	categories: number[];
	imageUrls: string[];
	itemAge: number;
	itemWeight: number;
	addressPrimary: string;
	addressSecondary: string;
	addressCity: string;
	addressState: string;
	addressZip: string;
};

interface PDFProps {
	data: TemplateData;
}

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 10,
		padding: 30,
	},
	header: {
		textAlign: 'center',
		marginBottom: 15,
		fontSize: 24,
	},
	invoiceDetails: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	companyDetails: {
		textAlign: 'left',
	},
	clientDetails: {
		textAlign: 'right',
	},
	table: {
		marginTop: 20,
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		flexDirection: 'row',
	},
	tableColHeader: {
		width: '20%',
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderBottomWidth: 1,
		borderRightWidth: 1,
		backgroundColor: '#f3f3f3',
		fontWeight: 'bold',
		padding: 5,
		textAlign: 'center',
	},
	tableCol: {
		width: '20%',
		borderStyle: 'solid',
		borderColor: '#bfbfbf',
		borderBottomWidth: 1,
		borderRightWidth: 1,
		padding: 5,
		textAlign: 'center',
	},
	totalSection: {
		marginTop: 10,
		alignItems: 'flex-end',
	},
	paymentMethods: {
		marginTop: 20,
	},
	paymentMethodText: {
		marginBottom: 3,
	},
	footer: {
		textAlign: 'center',
		marginTop: 30,
		fontWeight: 'bold',
	},
});

const formatArr = (arr) => {
	if (arr.length > 1) {
		return arr.join(', ');
	} else {
		return arr;
	}
};

const formatDescrip = (description) => {
	if (description.length > 350) {
		return (description.substring(0, 350) + "... contact seller for more information.");
	}

	return description
}

const PDF = ({ data }: PDFProps) => {
	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.header}>
					<Text>INVOICE</Text>
				</View>

				<View style={styles.invoiceDetails}>
					<View style={styles.companyDetails}>
						<Text>Garage</Text>
						<Text>Phone: (201) 293-7164</Text>
						<Text>Email: support@withgarage.com</Text>
						<Text>Website: withgarage.com</Text>
					</View>
					<View style={styles.clientDetails}>
						<Text>INVOICE DATE: {data.createdAt.split("T")[0]}</Text>
						<Text>Item Location</Text>
						<Text>
							{data.addressPrimary} {data.addressSecondary}
						</Text>
						<Text>
							{data.addressCity}, {data.addressState} {data.addressZip}
						</Text>
					</View>
				</View>

				<View style={styles.table}>
					<View style={styles.tableRow}>
						<Text style={styles.tableColHeader}>Categories</Text>
						<Text style={styles.tableColHeader}>Product</Text>
						<Text style={styles.tableColHeader}>Description</Text>
						<Text style={styles.tableColHeader}>UNIT PRICE</Text>
						<Text style={styles.tableColHeader}>Shippable</Text>
					</View>
					<View style={styles.tableRow}>
						<Text style={styles.tableCol}>{formatArr(data.categories)}</Text>
						<Text style={styles.tableCol}>{data.listingTitle}</Text>
						<Text style={styles.tableCol}>{formatDescrip(data.listingDescription)}</Text>
						<Text style={styles.tableCol}>${data.sellingPrice}</Text>
						<Text style={styles.tableCol}>
							{data.isShippable ? 'Can be shipped' : 'Cannot be shipped'}
						</Text>
					</View>
				</View>

				<View style={styles.footer}>
					<Text>Thank you for your business!</Text>
				</View>
			</Page>
		</Document>
	);
};

export default async (data: TemplateData) => {
	return await ReactPDF.renderToStream(<PDF {...{ data }} />);
};
