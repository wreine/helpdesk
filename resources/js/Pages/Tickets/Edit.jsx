import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TicketForm from './TicketForm';

export default function Edit({ ticket, options }) {
    const form = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        form.put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Edit Ticket</h2>}>
            <Head title="Edit Ticket" />

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow">
                    <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Update Ticket" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}