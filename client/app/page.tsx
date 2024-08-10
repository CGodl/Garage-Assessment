'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { uuidValidator, uuidExtract } from '@/lib/utils';

type ValueProps = {
  submission_id: string
}

export default function InvoiceGeneratorApp() {
	const formSchema = z.object({
		submission_id: z
			.string()
			.min(16, { message: 'Input needs at least 16 characters' }).refine((data) => uuidValidator(data), { message: "Input must contains a uuid value ex. 5259aa44-e523-423f-9542-613987f7b013"}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			submission_id: '',
		},
	});

  const onSubmission = async (values: ValueProps) => {
    
    
    try {
      const response = await axios.post('http://localhost:6006/api/invoice', {
        id: uuidExtract(values.submission_id)
      }, {
		responseType: 'blob' // Important to set this to handle binary data
	  })

	  const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
	  const pdfUrl = URL.createObjectURL(pdfBlob);

	  const link = document.createElement('a');
	  link.href = pdfUrl;
	  link.setAttribute('download', `${uuidExtract(values.submission_id)} Invoice.pdf`);
	  document.body.appendChild(link);
	  link.click();
	  
	  // Clean up the URL object and remove the link element
	  URL.revokeObjectURL(pdfUrl);
	  link.remove();

    } catch (error) {
      //TODO: Add Error Message
      console.log(error)
    }


  }

	return (
		<main>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmission)}>
					<FormField
						name='submission_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Invoice URL</FormLabel>
								<FormControl>
									<Input
										placeholder='Add a url or UUID to receive related pdf'
										{...field}
									/>
								</FormControl>
                {form.formState.errors?.submission_id && <p className='text-red-500'>{form.formState.errors?.submission_id.message}</p>}
							</FormItem>
						)}
					/>
					<Button>Generate Invoice</Button>
				</form>
			</Form>
		</main>
	);
}
