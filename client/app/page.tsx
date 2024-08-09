'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';


export default function InvoiceGeneratorApp() {

  const formSchema = z.object({
		submission_id: z.string().min(1, {message: "Input needs at least 1 value"})
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			submission_id: '',
		},
	});



  return (
    <main>
    
    </main>
  );
}
