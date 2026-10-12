import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TicketForm from './TicketForm';

export default function Create({ options }) {
    const form = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: 'Software',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">New Ticket</h2>}>
            <Head title="New Ticket" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow">
                    <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Create Ticket" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}