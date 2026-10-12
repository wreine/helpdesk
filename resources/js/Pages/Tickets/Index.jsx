import Badge from '@/Components/Badge';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ tickets, filters, options }) {
    const applyFilter = (key, value) => {
        router.get(
            route('tickets.index'),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    const selectClass =
        'rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">My Tickets</h2>}>
            <Head title="Tickets" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex flex-wrap gap-3">
                    <select
                        className={selectClass}
                        value={filters.status ?? ''}
                        onChange={(e) => applyFilter('status', e.target.value)}
                    >
                        <option value="">All statuses</option>
                        {options.statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <select
                        className={selectClass}
                        value={filters.priority ?? ''}
                        onChange={(e) => applyFilter('priority', e.target.value)}
                    >
                        <option value="">All priorities</option>
                        {options.priorities.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg bg-white p-10 text-center shadow">
                        <p className="text-gray-600">You have no tickets yet.</p>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                        >
                            Create your first ticket
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop table */}
                        <div className="hidden overflow-hidden rounded-lg bg-white shadow md:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 text-left text-xs font-medium uppercase text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3">Title</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3">Priority</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm">
                                    {tickets.data.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={route('tickets.show', t.id)}
                                                    className="font-medium text-indigo-600 hover:underline"
                                                >
                                                    {t.title}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3">{t.category}</td>
                                            <td className="px-4 py-3">
                                                <Badge value={t.priority} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge value={t.status} />
                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {new Date(t.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile cards */}
                        <div className="space-y-3 md:hidden">
                            {tickets.data.map((t) => (
                                <Link
                                    key={t.id}
                                    href={route('tickets.show', t.id)}
                                    className="block rounded-lg bg-white p-4 shadow"
                                >
                                    <p className="break-words font-medium text-gray-900">{t.title}</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <Badge value={t.priority} />
                                        <Badge value={t.status} />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        {t.category} · {new Date(t.created_at).toLocaleDateString()}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex items-center justify-between text-sm">
                            {tickets.prev_page_url ? (
                                <Link
                                    href={tickets.prev_page_url}
                                    className="rounded-md bg-white px-3 py-2 shadow hover:bg-gray-50"
                                >
                                    ← Previous
                                </Link>
                            ) : (
                                <span className="px-3 py-2 text-gray-400">← Previous</span>
                            )}

                            <span className="text-gray-600">
                                Page {tickets.current_page} of {tickets.last_page}
                            </span>

                            {tickets.next_page_url ? (
                                <Link
                                    href={tickets.next_page_url}
                                    className="rounded-md bg-white px-3 py-2 shadow hover:bg-gray-50"
                                >
                                    Next →
                                </Link>
                            ) : (
                                <span className="px-3 py-2 text-gray-400">Next →</span>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}