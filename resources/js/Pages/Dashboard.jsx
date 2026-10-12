import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const cards = [
        ['Total tickets', stats.total],
        ['Open', stats.open],
        ['In Progress', stats.in_progress],
        ['Resolved', stats.resolved],
    ];

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map(([label, count]) => (
                        <div key={label} className="rounded-lg bg-white p-6 shadow">
                            <p className="text-sm text-gray-500">{label}</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{count}</p>
                        </div>
                    ))}
                </div>

                <Link href={route('tickets.index')} className="mt-6 inline-block text-indigo-600 hover:underline">
                    View all tickets →
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}