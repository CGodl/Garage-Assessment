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

type ValueProps = {
  submission_id: string
}

export default function InvoiceGeneratorApp() {
	const formSchema = z.object({
		submission_id: z
			.string()
			.min(1, { message: 'Input needs at least 1 value' }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			submission_id: '',
		},
	});

  const onSubmission = async (values: ValueProps) => {
    console.log(values)
    
    try {
      const response = await axios.post('', {
        id: values.submission_id
      })

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
